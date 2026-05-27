import { NextResponse } from "next/server";

export const runtime = "nodejs";

interface ContactPayload {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  website?: unknown; // honeypot
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_MESSAGE_LEN = 5000;

function badRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}

export async function POST(req: Request) {
  let body: ContactPayload;
  try {
    body = (await req.json()) as ContactPayload;
  } catch {
    return badRequest("Invalid JSON body.");
  }

  // Honeypot: bots fill this in, humans don't see it. Return 200 so the
  // bot thinks it worked, but drop the submission silently.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!name || name.length > 100) {
    return badRequest("Please enter your name.");
  }
  if (!EMAIL_RE.test(email) || email.length > 254) {
    return badRequest("Please enter a valid email.");
  }
  if (!message) {
    return badRequest("Please enter a message.");
  }
  if (message.length > MAX_MESSAGE_LEN) {
    return badRequest(`Message is too long (max ${MAX_MESSAGE_LEN} characters).`);
  }

  // Split the single Name field into first + last for Loops. First token
  // is firstName; everything after the first space becomes lastName.
  const [firstName, ...rest] = name.split(/\s+/);
  const lastName = rest.join(" ");

  const apiKey = process.env.LOOPS_API_KEY;
  if (!apiKey) {
    console.error("/api/contact: LOOPS_API_KEY is not set");
    return NextResponse.json(
      { error: "Contact form is temporarily unavailable." },
      { status: 503 },
    );
  }

  // Upsert the contact. Intentionally omit `subscribed` so this never
  // flips a mailing-list subscriber's opt-in. `source` tags the contact
  // so it's filterable in the Loops dashboard alongside mailing-list
  // signups (which use source: "website").
  const contactPayload: Record<string, unknown> = {
    email,
    firstName,
    source: "contact-form",
  };
  if (lastName) contactPayload.lastName = lastName;

  try {
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
        { error: "Could not send your message. Please email us directly." },
        { status: 502 },
      );
    }

    // Fire the contactedUs event. The full message goes in eventProperties
    // so it's visible in the Loops dashboard Events view. Later you can
    // attach a Loop to this event to auto-email the committee or post to
    // Slack — no code changes needed on this end.
    const eventRes = await fetch("https://app.loops.so/api/v1/events/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        eventName: "contactedUs",
        eventProperties: {
          firstName,
          lastName: lastName || null,
          message,
          submittedAt: new Date().toISOString(),
        },
      }),
    });

    if (!eventRes.ok) {
      // Contact was still created/updated; the message text is in our
      // logs above. Don't fail the request — surface a soft success.
      const text = await eventRes.text();
      console.error("Loops events/send (contactedUs) failed:", eventRes.status, text);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("/api/contact error:", err);
    return NextResponse.json(
      { error: "Could not send your message. Please email us directly." },
      { status: 502 },
    );
  }
}
