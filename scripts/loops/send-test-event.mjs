// Fire a `signedUp` event for an existing (or new) contact to exercise
// the welcome Loop WITHOUT going through the website form.
//
//   node scripts/loops/send-test-event.mjs you+test@example.com           (dry run)
//   node scripts/loops/send-test-event.mjs you+test@example.com --apply    (sends)
//
// The event name and properties mirror src/app/api/subscribe/route.ts so
// the welcome Loop sees exactly what a real signup would produce.
import { loops, argEmail, banner, fail } from "./lib.mjs";

const email = argEmail();
if (!email) {
  console.error(
    "Usage: node scripts/loops/send-test-event.mjs <email> [--apply]",
  );
  process.exit(1);
}

const apply = banner(`send 'signedUp' event for ${email}`);
if (!apply) {
  console.log(
    "\nWould send eventName='signedUp' with eventProperties:",
    JSON.stringify(
      { firstName: "Test", lastInitial: "T", homeGroup: null },
      null,
      2,
    ),
  );
  process.exit(0);
}

try {
  const res = await loops.sendEvent({
    email,
    eventName: "signedUp",
    eventProperties: { firstName: "Test", lastInitial: "T", homeGroup: null },
  });
  console.log("✓ Event sent.");
  console.log(JSON.stringify(res, null, 2));
  console.log(
    "\nCheck the contact's Activity tab in Loops to see the welcome email status.",
  );
} catch (err) {
  fail(err);
}
