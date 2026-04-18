# Mailing list runbook

The signup form on the homepage (`EmailSignup`) posts to `/api/subscribe`,
which adds the contact to [Loops](https://loops.so) and fires a `signedUp`
event. Loops handles the welcome email, monthly broadcasts, unsubscribes, and
deliverability.

## One-time setup

### 1. Create a Loops account
- Sign up at https://loops.so.
- Free plan: 1,000 contacts and 2,000 emails/month — plenty for IAYPAA.

### 2. Verify the sending domain
Even if you read replies in a consumer Gmail, you should send **from**
`dotenagain.com` so email authentication (SPF/DKIM/DMARC) works and your
messages don't land in spam.

- In Loops → Settings → Sending domain, add `dotenagain.com`.
- Loops will show DNS records (SPF, DKIM, DMARC, a return-path CNAME).
  Add them at your DNS host.
- Wait for Loops to mark the domain as verified (usually 15 min – 2 hrs).
- Set your "From" address to something like `hello@dotenagain.com`.
  Replies can forward to your consumer Gmail via a simple forwarding rule.

### 3. Turn off tracking (privacy)
- In Loops → Settings, disable **open tracking** and **click tracking**.
- Don't connect Loops to any ad platforms (Meta, Google, etc.).

### 4. Get the API key
- Loops → Settings → API → Create key.
- Put it in `.env.local` as `LOOPS_API_KEY=...` for local dev.
- On Vercel (or wherever the site is hosted), add the same env var in the
  project settings.

### 5. Define the contact properties
Loops auto-creates properties on first use. After the first live signup,
confirm these exist on a contact in Loops:

- `email` (built-in)
- `firstName` (built-in)
- `lastInitial` (custom, text)
- `homeGroup` (custom, text, optional)
- `userGroup` (custom, text — all IAYPAA X signups get `iaypaa-2026`)
- `source` (custom, text — currently always `website`)

### 6. Build the welcome Loop
- In Loops → Loops → New loop.
- Trigger: **event** → `signedUp`.
- Action: send an email. Use variables like `{{firstName}}` in the body.
- Keep the welcome short: confirm they're subscribed, say when the next
  update is coming, link to the website.
- Publish the loop.

## Sending a broadcast (monthly update, merch drop, etc.)

1. Loops → Campaigns → New campaign.
2. Audience: filter where `userGroup = iaypaa-2026`.
3. Write the email in the editor or paste from a Doc.
4. Send a test to yourself first.
5. Schedule or send immediately.

## Exporting the list

- Loops → Contacts → Filter `userGroup = iaypaa-2026` → Export CSV.
- Keep a fresh export in a shared Drive folder once a month as a backup.

## Unsubscribes

Loops adds a one-click unsubscribe footer automatically. No extra code
needed. Check Loops → Contacts → filter on `subscribed = false` periodically
to see who has opted out.

## Retention

After the conference (post-August 2026 + 60 days), either:

- Export the list and delete it from Loops, or
- Keep only the contacts who opted into an ongoing "dotenagain" list via a
  follow-up email asking them to re-confirm.

## Troubleshooting

- **Form submits but contact doesn't appear in Loops**: check the server logs
  in Vercel for errors from `/api/subscribe`. Most common cause is a missing
  or invalid `LOOPS_API_KEY`.
- **Welcome email didn't send**: check the Loop is published in Loops and
  that the trigger is `signedUp` (case-sensitive).
- **Emails going to spam**: verify DKIM/SPF/DMARC are set up and the sending
  domain is verified in Loops.
