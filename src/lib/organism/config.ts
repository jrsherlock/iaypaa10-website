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
  /** A ripple crossing the surface. */
  ripple: 400,
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

/**
 * Spring stiffness per driven property. Higher reaches its target sooner.
 *
 * The pointer reaction is spring-driven rather than given a fixed duration:
 * a membrane that answers on a timer arrives at the same moment however far
 * it has to travel, which reads as mechanical. These settle in roughly the
 * quarter-second the brief asks for.
 */
export const SPRING = {
  /** Lean toward the pointer — quick enough to feel attentive. */
  lean: 34,
  /** Rousing and settling. */
  rouse: 12,
} as const;
