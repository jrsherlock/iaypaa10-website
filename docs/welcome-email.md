# Welcome email — IAYPAA X Committee

This is the email a new subscriber should receive immediately after
signing up on the website. The signup form → `/api/subscribe` already
upserts the contact and fires a `signedUp` event in Loops. This document
is the **content** for the Loop that listens for that event.

> **Why this lives here and not in code:** Loops has no API to create
> automations or email templates — that's a dashboard-only action. This
> file is the version-controlled source of truth; paste it into Loops.

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

## Wiring it in Loops (the part only you can do)

1. **Loops → Loops → New loop.**
2. **Trigger:** Event → choose `signedUp` (case-sensitive — it must
   match exactly what `/api/subscribe` sends).
3. **Add a delay?** No — send immediately.
4. **Action:** Send email.
5. In the email editor, set the **subject** and **preview text** above.
6. Body: either
   - paste the plain version above into the rich-text editor, or
   - switch the editor to **Code / HTML** and paste
     [`welcome-email.html`](./welcome-email.html) (on-brand dark theme).
7. Use the **insert-variable** control for `{{firstName}}` so the token
   is whatever Loops expects internally.
8. Confirm the **From** name is `IAYPAA X Committee` and the From
   address is on your verified sending domain (see
   [`mailing-list.md`](./mailing-list.md) §2 — domain verification is
   what keeps this out of spam).
9. **Publish** the loop (not Draft — a Draft loop will not send).

## Test it without using the website

```
node scripts/loops/send-test-event.mjs you+welcometest@yourdomain.com --apply
```

Then check that inbox (and spam), and the contact's **Activity** tab in
Loops to confirm the loop fired and the email was delivered. Clean up
with `node scripts/loops/delete-contact.mjs you+welcometest@yourdomain.com --apply`.

## Alternative: send it transactionally from code

If you'd rather the welcome email be sent by *our* code instead of a
dashboard Loop (more control, lives in the repo, easier to test), the
path is:

1. In Loops, create a **Transactional** email template → you get a
   `transactionalId`.
2. Add `LOOPS_TRANSACTIONAL_WELCOME_ID` to env (local + Vercel).
3. In `src/app/api/subscribe/route.ts`, after the contact upsert,
   call `loops.sendTransactionalEmail({ transactionalId, email,
   dataVariables: { firstName, ... } })` instead of (or alongside)
   the `signedUp` event.

This still needs the template built once in the dashboard, but the
*trigger* moves into code. Say the word and I'll wire it up.
