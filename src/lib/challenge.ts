import { CHALLENGE, type ChallengeTier } from "@/lib/constants";

/**
 * Challenge-Palooza derived state. The thermometer uses an even-spacing
 * scale — each tier is one equal step up the tube regardless of dollar
 * gap — so the $50/$100/$150 rungs don't crush together at the bottom of
 * a linear $0–$2500 axis. A raised amount between two tiers interpolates
 * within that step.
 */

export function unlockedTiers(): readonly ChallengeTier[] {
  return CHALLENGE.tiers.filter((t) => t.amount <= CHALLENGE.raised);
}

/** The first tier the running total hasn't reached — null once done. */
export function nextTier(): ChallengeTier | null {
  return CHALLENGE.tiers.find((t) => t.amount > CHALLENGE.raised) ?? null;
}

/**
 * Progress through the even-spacing scale as a 0..1 fraction.
 * $0 → 0; each tier boundary → i/tiers.length; interpolated between.
 */
export function scaleFraction(amount: number): number {
  const tiers = CHALLENGE.tiers;
  const n = tiers.length;
  if (amount <= 0) return 0;
  if (amount >= tiers[n - 1].amount) return 1;
  let lowerAmt = 0;
  let lowerIdx = 0; // step index of the lower boundary (0 = $0)
  for (let i = 0; i < n; i++) {
    if (tiers[i].amount > amount) {
      const upperAmt = tiers[i].amount;
      const within = (amount - lowerAmt) / (upperAmt - lowerAmt);
      return (lowerIdx + within) / n;
    }
    lowerAmt = tiers[i].amount;
    lowerIdx = i + 1;
  }
  return 1;
}

export function formatUSD(amount: number): string {
  return `$${amount.toLocaleString("en-US")}`;
}
