// Look up a single contact by email.
//   node scripts/loops/find-contact.mjs someone@example.com
import { loops, argEmail, fail } from "./lib.mjs";

const email = argEmail();
if (!email) {
  console.error("Usage: node scripts/loops/find-contact.mjs <email>");
  process.exit(1);
}

try {
  const contacts = await loops.findContact({ email });
  if (!contacts || contacts.length === 0) {
    console.log(`(no contact found for ${email})`);
    process.exit(0);
  }
  console.log(JSON.stringify(contacts, null, 2));
} catch (err) {
  fail(err);
}
