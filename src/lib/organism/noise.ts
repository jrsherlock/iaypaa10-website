/**
 * Dependency-free procedural noise for the speaker-card organisms.
 *
 * The organisms must never look like they are looping. A sine wave gives
 * itself away within about two cycles, so deformation is driven by fractal
 * value noise instead: continuous, smooth, and without a period a viewer can
 * latch onto.
 *
 * Everything here is pure and deterministic — the same seed always yields the
 * same organism, which keeps server and client render agreeing and makes the
 * motion reproducible when debugging.
 */

/** Hash an integer to the 0..1 range. */
function hash(n: number): number {
  const s = Math.sin(n * 12.9898) * 43758.5453123;
  return s - Math.floor(s);
}

/** Ken Perlin's smootherstep: zero 1st and 2nd derivatives at the endpoints. */
function smootherstep(t: number): number {
  return t * t * t * (t * (t * 6 - 15) + 10);
}

/** 1-D value noise in the -1..1 range. */
export function noise1(x: number, seed = 0): number {
  const offset = seed * 137.17;
  const i = Math.floor(x);
  const f = x - i;
  const a = hash(i + offset);
  const b = hash(i + 1 + offset);
  return (a + (b - a) * smootherstep(f)) * 2 - 1;
}

/**
 * Fractal Brownian motion — a few octaves of `noise1` at halving amplitude.
 * Adds the fine detail that reads as "internal movement" rather than a single
 * smooth wobble.
 */
export function fbm1(x: number, seed = 0, octaves = 3): number {
  let sum = 0;
  let amplitude = 1;
  let frequency = 1;
  let norm = 0;

  for (let i = 0; i < octaves; i++) {
    sum += noise1(x * frequency, seed + i * 31) * amplitude;
    norm += amplitude;
    amplitude *= 0.5;
    frequency *= 2;
  }

  return sum / norm;
}

/** Small, fast, seedable PRNG for per-organism constants. */
export function makeRandom(seed: number): () => number {
  let state = seed >>> 0 || 1;
  return () => {
    state |= 0;
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function clamp(value: number, min: number, max: number): number {
  return value < min ? min : value > max ? max : value;
}

/**
 * Critically damped spring step. Gives acceleration, deceleration and a touch
 * of inertia without the ringing of an underdamped spring — organic rather
 * than bouncy, which is the distinction the brief draws.
 *
 * @param current   present value
 * @param target    value being approached
 * @param velocity  carried between frames; mutated by the caller
 * @param stiffness higher converges faster
 * @param deltaMs   frame time, clamped by the caller
 * @returns the new value and velocity
 */
export function spring(
  current: number,
  target: number,
  velocity: number,
  stiffness: number,
  deltaMs: number,
): { value: number; velocity: number } {
  // Seconds, and capped so a backgrounded tab returning does not explode.
  const dt = Math.min(deltaMs, 50) / 1000;
  const damping = 2 * Math.sqrt(stiffness);

  const acceleration = (target - current) * stiffness - velocity * damping;
  const nextVelocity = velocity + acceleration * dt;

  return { value: current + nextVelocity * dt, velocity: nextVelocity };
}
