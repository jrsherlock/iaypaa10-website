# Welcome email — IAYPAA X Committee

This is the email a new subscriber receives immediately after signing up
on the website. The signup form → `/api/subscribe` upserts the contact,
fires a `signedUp` event, and **sends this email transactionally** (see
"Wiring" below). This document is the version-controlled **content** for
the Loops Transactional template.

> **Why a one-time dashboard step remains:** Loops has no API to create
> email templates — that's dashboard-only. Everything else (the trigger,
> the recipient, the merge data) lives in our code. Paste the HTML here
> into the Loops template once and set the env var.

Available merge variables (set on the contact by `/api/subscribe`):
`{{firstName}}`, `{{lastInitial}}`, `{{homeGroup}}`, `{{email}}`.
Use the Loops editor's "insert variable" picker rather than hand-typing
the tokens, so the syntax matches whatever Loops expects.

---

## Subject

```
You're on the list — IAYPAA X is coming
```

Alternate subjects (A/B if you want):
- `You're in. IAYPAA X — Primordial Ooze`
- `Welcome to the ooze — you're on the IAYPAA X list`

## Preview text (the gray line after the subject in most inboxes)

```
The 10th Annual Iowa Young People in A.A. — Aug 14–16, 2026, Iowa City.
```

## Body (plain / rich-text version)

```
Hi {{firstName}},

You're on the IAYPAA X mailing list. That's the whole ask — nothing
else you need to do right now.

Here's what you signed up for:

IAYPAA X — "Primordial Ooze" — the 10th Annual Iowa Young People in
Alcoholics Anonymous conference. August 14–16, 2026, at The Highlander
Hotel in Iowa City, Iowa. A weekend of speaker meetings, workshops,
fellowship, and the kind of fun that reminds you why this works.

We'll only email when there's something real to say:

  • When registration opens (early-bird pricing goes first)
  • When the hotel room block goes live
  • When speakers are announced
  • The occasional update as the weekend takes shape

No spam, we don't share the list, and you can leave anytime — there's
an unsubscribe link at the bottom of every email.

First time at an IAYPAA conference? You don't have to be "young" and
you don't have to know a soul. Just show up. We'll take it from there.

See you in the ooze.

— The IAYPAA X Committee
Iowa Young People in Alcoholics Anonymous
iaypaa@gmail.com
```

---

## Wiring (now done in code — transactional)

The send is **already wired in `src/app/api/subscribe/route.ts`**: after a
successful signup it calls Loops' transactional endpoint with
`transactionalId = LOOPS_TRANSACTIONAL_WELCOME_ID` and
`dataVariables: { firstName, lastInitial, homeGroup }`. It is non-fatal —
if the env var is unset or Loops errors, the signup still succeeds and the
miss is logged. So the *trigger and content wiring live in the repo*; the
only step Loops forces into the dashboard is creating the template itself
(Loops has no API to create email templates).

**One-time setup (the only part only you can do):**

1. **Loops → Transactional → Create.** (Transactional, *not* a Loop.)
2. Set the **subject** and **preview text** from the sections above.
3. Body: switch the editor to **Code / HTML** and paste
   [`welcome-email.html`](./welcome-email.html) (on-brand; placeholder —
   restyle anytime, the wiring doesn't change).
4. Add the data variable **`firstName`** via Loops' variable picker (also
   `lastInitial`, `homeGroup` if you use them) so the token syntax matches
   what Loops expects. The route sends exactly these names.
5. Confirm **From** name `IAYPAA X Committee` on your verified sending
   domain (see [`mailing-list.md`](./mailing-list.md) §2 — domain
   verification is what keeps this out of spam).
6. **Publish** the transactional email, then copy its **`transactionalId`**.
7. Put that id in **`.env.local`** and in **Vercel** (Production +
   Preview) as `LOOPS_TRANSACTIONAL_WELCOME_ID`, then redeploy.

> Do **not** also build a `signedUp` Loop that sends a welcome email —
> that would double-send. The `signedUp` event still fires and is fine to
> use for *other* automations/analytics, just not a second welcome.

## Test it without using the website

```
node scripts/loops/send-welcome-test.mjs you+welcometest@yourdomain.com --apply
```

Sends the exact transactional call `/api/subscribe` makes. Check that
inbox (and spam) and the contact's **Activity** tab in Loops. (Run it
without `--apply` first for a dry run.) Clean up any test contact with
`node scripts/loops/delete-contact.mjs you+welcometest@yourdomain.com --apply`.
