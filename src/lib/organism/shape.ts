/**
 * Membrane geometry.
 *
 * The outline is a closed loop of control points whose radius is modulated by
 * fractal noise, then joined with Catmull-Rom-derived cubic Béziers so the
 * curve stays smooth however violently the radii move. Deforming real geometry
 * — rather than animating `border-radius` on a div — is what lets the membrane
 * stretch, spike a tendril, and retract without ever looking like a rounded
 * rectangle pretending to be alive.
 *
 * Cost is a few dozen multiplications per frame per organism and one `d`
 * attribute write. No filter re-runs, no layout, no paint outside the path.
 */

import { fbm1 } from "./noise";

export type MembraneOptions = {
  /** Control points around the loop. Eight reads as organic; more just costs. */
  points: number;
  /** Base radius in viewBox units. */
  radius: number;
  /** Fraction of the radius the noise may add or remove. */
  wobble: number;
  /** Animation clock in seconds. */
  time: number;
  /** Per-organism seed, so no two membranes share a shape. */
  seed: number;
  /** How fast the surface churns. */
  speed: number;
  /** Directional stretch, -1..1 on each axis. Drives reaching and leaning. */
  stretchX?: number;
  stretchY?: number;
  /**
   * 0..1. Spikes a few control points into tendrils. Which points spike is
   * chosen by the seed, so each organism reaches with its own limbs.
   */
  tendrils?: number;
};

/** Catmull-Rom tangent scale that yields a visually uniform closed curve. */
const TANGENT = 1 / 6;

type Point = { x: number; y: number };

/**
 * Build the membrane outline as an SVG path string, centred on (cx, cy).
 */
export function membranePath(
  options: MembraneOptions,
  cx: number,
  cy: number,
): string {
  const {
    points,
    radius,
    wobble,
    time,
    seed,
    speed,
    stretchX = 0,
    stretchY = 0,
    tendrils = 0,
  } = options;

  const ring: Point[] = [];

  for (let i = 0; i < points; i++) {
    const angle = (i / points) * Math.PI * 2;

    // Each control point walks its own noise line, offset far enough apart
    // that neighbours stay loosely correlated rather than moving in lockstep.
    const deform = fbm1(time * speed + i * 1.37, seed + i * 7);

    // Tendrils spike alternating points so limbs extend rather than the whole
    // body inflating. The +seed offset varies which points those are.
    const isTendril = (i + seed) % 3 === 0;
    const spike = isTendril ? tendrils * 0.55 : tendrils * -0.08;

    const r = radius * (1 + deform * wobble + spike);

    ring.push({
      x: cx + Math.cos(angle) * r * (1 + stretchX),
      y: cy + Math.sin(angle) * r * (1 + stretchY),
    });
  }

  return closedCurve(ring);
}

/** Join points into a closed path of cubic Béziers with Catmull-Rom tangents. */
function closedCurve(ring: Point[]): string {
  const n = ring.length;
  let d = `M ${round(ring[0].x)} ${round(ring[0].y)}`;

  for (let i = 0; i < n; i++) {
    const previous = ring[(i - 1 + n) % n];
    const current = ring[i];
    const next = ring[(i + 1) % n];
    const after = ring[(i + 2) % n];

    const c1x = current.x + (next.x - previous.x) * TANGENT;
    const c1y = current.y + (next.y - previous.y) * TANGENT;
    const c2x = next.x - (after.x - current.x) * TANGENT;
    const c2y = next.y - (after.y - current.y) * TANGENT;

    d += ` C ${round(c1x)} ${round(c1y)} ${round(c2x)} ${round(c2y)} ${round(next.x)} ${round(next.y)}`;
  }

  return `${d} Z`;
}

/** Two decimals is below the visible threshold and keeps the string short. */
function round(value: number): number {
  return Math.round(value * 100) / 100;
}
