// Send the transactional welcome email to one address WITHOUT going
// through the website form — the same call /api/subscribe makes.
//
//   node scripts/loops/send-welcome-test.mjs you+test@example.com           (dry run)
//   node scripts/loops/send-welcome-test.mjs you+test@example.com --apply    (sends)
//
// Requires LOOPS_TRANSACTIONAL_WELCOME_ID in .env.local — the id of the
// Transactional email you created in Loops (see docs/welcome-email.md).
import {
  loops,
  argEmail,
  banner,
  fail,
  WELCOME_TRANSACTIONAL_ID,
} from "./lib.mjs";

const email = argEmail();
if (!email) {
  console.error(
    "Usage: node scripts/loops/send-welcome-test.mjs <email> [--apply]",
  );
  process.exit(1);
}

if (!WELCOME_TRANSACTIONAL_ID) {
  console.error(
    "Missing LOOPS_TRANSACTIONAL_WELCOME_ID in .env.local — create the\n" +
      "Transactional email in Loops first (see docs/welcome-email.md).",
  );
  process.exit(1);
}

// dataVariables mirror src/app/api/subscribe/route.ts exactly.
const dataVariables = { firstName: "Test", lastInitial: "T", homeGroup: "" };

const apply = banner(`send welcome email to ${email}`);
if (!apply) {
  console.log(
    `\nWould send transactionalId=${WELCOME_TRANSACTIONAL_ID} with`,
    "dataVariables:",
    JSON.stringify(dataVariables, null, 2),
  );
  process.exit(0);
}

try {
  const res = await loops.sendTransactionalEmail({
    transactionalId: WELCOME_TRANSACTIONAL_ID,
    email,
    dataVariables,
  });
  console.log("✓ Welcome email sent.");
  console.log(JSON.stringify(res, null, 2));
  console.log(
    "\nCheck that inbox (and spam), then the contact's Activity tab in Loops.",
  );
} catch (err) {
  fail(err);
}
