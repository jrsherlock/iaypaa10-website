/**
 * Every tunable the organisms use, in one place.
 *
 * Timings come from the animation brief; the geometry values were settled by
 * eye. Nothing in the components should carry a bare number.
 */

/** Milliseconds. */
export const TIMING = {
  /** One full swell of the idle breath. */
  idlePulseMin: 8_000,
  idlePulseMax: 15_000,
  /** The whole notice → reach → liquefy → retract sequence. */
  reveal: 1_100,
  /** Membrane answering the pointer. */
  hover: 250,
  /** A ripple crossing the surface. */
  ripple: 400,
  /** A droplet separating and dissolving. */
  droplet: 600,
  /** Idle twitches fire somewhere in this window, per organism. */
  microEventMin: 10_000,
  microEventMax: 20_000,
} as const;

/** Membrane geometry, in viewBox units on a 100×100 canvas. */
export const SHAPE = {
  points: 9,
  radius: 30,
  /**
   * Resting deformation. Low values read as a circle with a dent in it — the
   * membrane has to be visibly irregular at rest or it looks like a loading
   * dot rather than a specimen.
   */
  wobble: 0.26,
  /** Deformation while roused. */
  wobbleRoused: 0.42,
  /** Per-organism resting asymmetry, so no membrane is ever a circle. */
  asymmetry: 0.3,
  /** Surface churn rate. */
  speed: 0.08,
  /** Churn rate while roused. */
  speedRoused: 0.22,
  /** How far the body leans toward a pointer, in viewBox units. */
  leanDistance: 6,
} as const;

/** Spring stiffness per driven property. Higher reaches its target sooner. */
export const SPRING = {
  /** Body scale — slow, so swelling reads as breath. */
  scale: 18,
  /** Lean toward the pointer — quick enough to feel attentive. */
  lean: 34,
  /** Rousing and settling. */
  rouse: 12,
  /** Tendril extension. */
  tendril: 22,
} as const;

/**
 * The covering sheet, in viewBox units. It starts large enough to hide the
 * whole portrait — a radius of 78 clears the 70.7 half-diagonal even at full
 * negative wobble — and ends as the organism parked in the lower-right corner.
 */
export const REVEAL = {
  coveredRadius: 92,
  /**
   * What is left once the sheet has retracted. Small and pushed hard into the
   * corner: this is residue clinging to the edge of the frame, not an object
   * sitting on the portrait.
   */
  cornerRadius: 9,
  cornerX: 88,
  cornerY: 86,
  /** Opacity the sheet settles to, letting the portrait read through it. */
  settledOpacity: 0.5,
  /** Peak displacement while the sheet liquefies. Zero at both ends. */
  displacement: 11,
  /** Turbulence scale of the liquid edge. Lower is coarser, more viscous. */
  turbulence: 0.021,
  /** Where in the sequence tendrils reach hardest. */
  tendrilPeak: 0.26,
  /** Where droplets separate from the retreating edge. */
  dropletRelease: 0.55,
} as const;

export const DROPLETS = 4;
