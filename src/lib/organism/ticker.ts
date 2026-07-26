/**
 * One requestAnimationFrame loop for every organism on the page.
 *
 * A loop per card would mean a dozen rAF callbacks competing on a phone. All
 * organisms share this ticker instead; it starts on the first subscriber and
 * stops on the last, so a page with no visible organism costs nothing.
 *
 * The loop also parks itself when the tab is hidden — a backgrounded tab
 * throttles rAF anyway, but stopping outright means no wake-up work at all.
 */

export type TickListener = (elapsedMs: number, deltaMs: number) => void;

const listeners = new Set<TickListener>();

let frameHandle = 0;
let lastTimestamp = 0;
/** Wall-clock time the organisms have actually been animating. */
let elapsed = 0;

function frame(timestamp: number): void {
  const delta = lastTimestamp === 0 ? 16.7 : timestamp - lastTimestamp;
  lastTimestamp = timestamp;
  elapsed += delta;

  // Iterate a copy: a listener may unsubscribe itself mid-tick.
  for (const listener of Array.from(listeners)) {
    listener(elapsed, delta);
  }

  frameHandle = requestAnimationFrame(frame);
}

function start(): void {
  if (frameHandle !== 0 || listeners.size === 0) return;
  if (typeof document !== "undefined" && document.hidden) return;
  lastTimestamp = 0;
  frameHandle = requestAnimationFrame(frame);
}

function stop(): void {
  if (frameHandle === 0) return;
  cancelAnimationFrame(frameHandle);
  frameHandle = 0;
}

let visibilityBound = false;

function bindVisibility(): void {
  if (visibilityBound || typeof document === "undefined") return;
  visibilityBound = true;
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stop();
    else start();
  });
}

/** Register a per-frame callback. Returns its unsubscribe function. */
export function subscribe(listener: TickListener): () => void {
  bindVisibility();
  listeners.add(listener);
  start();

  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) stop();
  };
}
