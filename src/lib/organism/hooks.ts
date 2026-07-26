"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(onChange: () => void): () => void {
  const query = window.matchMedia(REDUCED_MOTION_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/**
 * Whether the visitor has asked for reduced motion.
 *
 * Read through `useSyncExternalStore` so the value is never stale between the
 * media query changing and React re-rendering. The server snapshot is `true`:
 * the first paint is always the still version, because an organism that starts
 * writhing and only then discovers it should not have is worse than one that
 * starts still and wakes a frame later.
 */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => true,
  );
}

type InViewOptions = {
  /** Stop observing after the first entry. Used for one-shot reveals. */
  once?: boolean;
  /** Fraction of the element that must be visible to count. */
  threshold?: number;
  rootMargin?: string;
};

/**
 * Track whether an element is on screen.
 *
 * Organisms use this twice over: to fire the reveal, and to skip per-frame
 * work entirely while scrolled away. An offscreen organism costs nothing.
 */
export function useInView<T extends Element>(
  options: InViewOptions = {},
): [React.RefObject<T | null>, boolean] {
  const { once = false, threshold = 0.25, rootMargin = "0px" } = options;
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Without IntersectionObserver, treat the element as permanently visible
    // rather than never animating — otherwise a covering sheet would never
    // retract and the portrait beneath it would stay hidden for good.
    // Deferred a frame so this is not a synchronous setState in an effect.
    if (typeof IntersectionObserver === "undefined") {
      const handle = requestAnimationFrame(() => setInView(true));
      return () => cancelAnimationFrame(handle);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [once, threshold, rootMargin]);

  return [ref, inView];
}
