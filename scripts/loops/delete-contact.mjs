// Delete a contact by email. DESTRUCTIVE — requires --apply.
//
//   node scripts/loops/delete-contact.mjs old+test@example.com           (dry run)
//   node scripts/loops/delete-contact.mjs old+test@example.com --apply    (deletes)
//
// Prints the contact first so you can eyeball it before committing.
import { loops, argEmail, banner, fail } from "./lib.mjs";

const email = argEmail();
if (!email) {
  console.error(
    "Usage: node scripts/loops/delete-contact.mjs <email> [--apply]",
  );
  process.exit(1);
}

const apply = banner(`delete contact ${email}`);

try {
  const contacts = await loops.findContact({ email });
  if (!contacts || contacts.length === 0) {
    console.log(`(no contact found for ${email} — nothing to delete)`);
    process.exit(0);
  }

  console.log("\nContact that will be deleted:");
  console.log(JSON.stringify(contacts[0], null, 2));

  if (!apply) {
    console.log("\nDry run — re-run with --apply to actually delete.");
    process.exit(0);
  }

  const res = await loops.deleteContact({ email });
  console.log("\n✓ Deleted.");
  console.log(JSON.stringify(res, null, 2));
} catch (err) {
  fail(err);
}
