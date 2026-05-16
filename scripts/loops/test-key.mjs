// Quick health check — confirms LOOPS_API_KEY in .env.local is valid.
//   node scripts/loops/test-key.mjs
import { loops, fail } from "./lib.mjs";

try {
  const res = await loops.testApiKey();
  console.log("✓ Loops API key is valid.");
  console.log(JSON.stringify(res, null, 2));
} catch (err) {
  fail(err);
}
