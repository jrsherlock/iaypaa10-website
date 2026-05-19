import { NextResponse } from "next/server";

export const runtime = "nodejs";

interface SubscribePayload {
  firstName?: unknown;
  lastInitial?: unknown;
  email?: unknown;
  homeGroup?: unknown;
  consent?: unknown;
  website?: unknown; // honeypot
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function badRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}

export async function POST(req: Request) {
  let body: SubscribePayload;
  try {
    body = (await req.json()) as SubscribePayload;
  } catch {
    return badRequest("Invalid JSON body.");
  }

  // Honeypot: bots fill this in, humans don't see it.
  // Return 200 so the bot thinks it worked, but do nothing.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const firstName = typeof body.firstName === "string" ? body.firstName.trim() : "";
  const lastInitialRaw =
    typeof body.lastInitial === "string" ? body.lastInitial.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const homeGroup =
    typeof body.homeGroup === "string" ? body.homeGroup.trim() : "";
  const consent = body.consent === true;

  if (!firstName || firstName.length > 50) {
    return badRequest("First name is required.");
  }
  if (!lastInitialRaw) {
    return badRequest("Last initial is required.");
  }
  if (!EMAIL_RE.test(email) || email.length > 254) {
    return badRequest("Please enter a valid email.");
  }
  if (!consent) {
    return badRequest("Please confirm you want to receive updates.");
  }
  if (homeGroup.length > 120) {
    return badRequest("Home group is too long.");
  }

  const lastInitial = lastInitialRaw.charAt(0).toUpperCase();

  const apiKey = process.env.LOOPS_API_KEY;
  if (!apiKey) {
    console.error("/api/subscribe: LOOPS_API_KEY is not set");
    return NextResponse.json(
      { error: "Subscriptions are temporarily unavailable." },
      { status: 503 },
    );
  }

  const contactPayload: Record<string, unknown> = {
    email,
    firstName,
    lastInitial,
    userGroup: "iaypaa-2026",
    source: "website",
    subscribed: true,
  };
  if (homeGroup) contactPayload.homeGroup = homeGroup;

  try {
    // Upsert the contact. Loops returns 409 if contact already exists on create,
    // so we use the update endpoint which performs an upsert.
    const contactRes = await fetch(
      "https://app.loops.so/api/v1/contacts/update",
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactPayload),
      },
    );

    if (!contactRes.ok) {
      const text = await contactRes.text();
      console.error("Loops contacts/update failed:", contactRes.status, text);
      return NextResponse.json(
        { error: "Could not complete subscription. Please try again." },
        { status: 502 },
      );
    }

    // Fire the signup event. The 'signedUp' loop in Loops handles the welcome email.
    const eventRes = await fetch("https://app.loops.so/api/v1/events/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        eventName: "signedUp",
        eventProperties: { firstName, lastInitial, homeGroup: homeGroup || null },
      }),
    });

    if (!eventRes.ok) {
      // Contact was still created; log but don't fail the request.
      const text = await eventRes.text();
      console.error("Loops events/send failed:", eventRes.status, text);
    }

    // Welcome email — sent transactionally from our code so the trigger
    // lives in the repo (not a dashboard Loop). One-time setup: create a
    // Transactional email in Loops with the body from
    // docs/welcome-email.html, then set LOOPS_TRANSACTIONAL_WELCOME_ID.
    // Non-fatal: a missing id or a Loops hiccup must never fail the signup.
    // .trim() so an empty / whitespace placeholder env value (Vercel may
    // not store a truly empty string) counts as "not configured".
    const welcomeId = process.env.LOOPS_TRANSACTIONAL_WELCOME_ID?.trim();
    if (welcomeId) {
      try {
        const welcomeRes = await fetch(
          "https://app.loops.so/api/v1/transactional",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${apiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              transactionalId: welcomeId,
              email,
              dataVariables: {
                firstName,
                lastInitial,
                homeGroup: homeGroup || "",
              },
            }),
          },
        );
        if (!welcomeRes.ok) {
          const text = await welcomeRes.text();
          console.error(
            "Loops transactional welcome failed:",
            welcomeRes.status,
            text,
          );
        }
      } catch (welcomeErr) {
        console.error("Loops transactional welcome error:", welcomeErr);
      }
    } else {
      console.warn(
        "/api/subscribe: LOOPS_TRANSACTIONAL_WELCOME_ID not set — welcome email skipped",
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("/api/subscribe error:", err);
    return NextResponse.json(
      { error: "Could not complete subscription. Please try again." },
      { status: 502 },
    );
  }
}
