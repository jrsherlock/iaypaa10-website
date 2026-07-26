"use client";

import { useEffect, useRef } from "react";
import { SHAPE, SPRING, TIMING } from "@/lib/organism/config";
import { usePrefersReducedMotion, useInView } from "@/lib/organism/hooks";
import { clamp, makeRandom, spring } from "@/lib/organism/noise";
import { membranePath } from "@/lib/organism/shape";
import { subscribe } from "@/lib/organism/ticker";

/**
 * A living membrane.
 *
 * Used on speaker cards whose subject has not been cultured yet: the organism
 * exists, breathes, notices a pointer, and twitches to itself, but has nothing
 * to reveal. Its whole job is to look like something that will eventually
 * become someone.
 *
 * Per frame it writes one `d` attribute and two transforms. No React state is
 * touched by the animation loop — a `setState` per frame across several cards
 * is what makes this kind of effect stutter.
 */

type OrganismProps = {
  /** Per-instance seed. Two organisms with different seeds never sync up. */
  seed: number;
  /** Rendered size in pixels. */
  size: number;
  className?: string;
  /** Accessible description, or omit to mark it decorative. */
  label?: string;
};

const VIEWBOX = 100;
const CENTER = VIEWBOX / 2;

export default function Organism({
  seed,
  size,
  className,
  label,
}: OrganismProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [containerRef, inView] = useInView<HTMLDivElement>({ threshold: 0.1 });

  const bodyRef = useRef<SVGPathElement | null>(null);
  const glowRef = useRef<SVGPathElement | null>(null);
  const nucleusRef = useRef<SVGGElement | null>(null);
  const rippleRef = useRef<SVGCircleElement | null>(null);

  /** Pointer-driven state, read by the loop rather than by React. */
  const pointer = useRef({ x: 0, y: 0, inside: false });

  useEffect(() => {
    if (prefersReducedMotion || !inView) return;

    const body = bodyRef.current;
    const glow = glowRef.current;
    const nucleus = nucleusRef.current;
    const ripple = rippleRef.current;
    if (!body || !glow || !nucleus || !ripple) return;

    const random = makeRandom(seed);

    // Each organism gets its own clock offset, so two cards that scroll into
    // view together are still at different points in their breathing.
    const phase = random() * 1000;
    // A permanent lopsidedness, so it is never a circle even at rest.
    const skewX = (random() - 0.5) * SHAPE.asymmetry;
    const skewY = (random() - 0.5) * SHAPE.asymmetry;
    const breathPeriod =
      TIMING.idlePulseMin + random() * (TIMING.idlePulseMax - TIMING.idlePulseMin);

    // Springs: value, velocity and target per driven property.
    let rouse = 0;
    let rouseVelocity = 0;
    let leanX = 0;
    let leanXVelocity = 0;
    let leanY = 0;
    let leanYVelocity = 0;

    /** 0..1, decays after a micro-event or a hover pulse. */
    let flare = 0;
    let rippleAge = Infinity;

    let nextMicroEvent =
      TIMING.microEventMin + random() * (TIMING.microEventMax - TIMING.microEventMin);

    const unsubscribe = subscribe((elapsed, delta) => {
      const seconds = (elapsed + phase) / 1000;

      // --- idle breath -------------------------------------------------
      const breath = Math.sin(((elapsed + phase) / breathPeriod) * Math.PI * 2);

      // --- micro-events ------------------------------------------------
      nextMicroEvent -= delta;
      if (nextMicroEvent <= 0) {
        flare = 1;
        rippleAge = 0;
        nextMicroEvent =
          TIMING.microEventMin +
          random() * (TIMING.microEventMax - TIMING.microEventMin);
      }
      flare = Math.max(0, flare - delta / TIMING.ripple);

      // --- pointer attention -------------------------------------------
      const rouseTarget = pointer.current.inside ? 1 : 0;
      ({ value: rouse, velocity: rouseVelocity } = spring(
        rouse,
        rouseTarget,
        rouseVelocity,
        SPRING.rouse,
        delta,
      ));

      const leanTargetX = pointer.current.inside
        ? pointer.current.x * SHAPE.leanDistance
        : 0;
      const leanTargetY = pointer.current.inside
        ? pointer.current.y * SHAPE.leanDistance
        : 0;

      ({ value: leanX, velocity: leanXVelocity } = spring(
        leanX,
        leanTargetX,
        leanXVelocity,
        SPRING.lean,
        delta,
      ));
      ({ value: leanY, velocity: leanYVelocity } = spring(
        leanY,
        leanTargetY,
        leanYVelocity,
        SPRING.lean,
        delta,
      ));

      // --- membrane ----------------------------------------------------
      const wobble =
        SHAPE.wobble + (SHAPE.wobbleRoused - SHAPE.wobble) * rouse + flare * 0.06;
      const speed = SHAPE.speed + (SHAPE.speedRoused - SHAPE.speed) * rouse;
      const radius = SHAPE.radius * (1 + breath * 0.045 + rouse * 0.06);

      const d = membranePath(
        {
          points: SHAPE.points,
          radius,
          wobble,
          time: seconds,
          seed,
          speed,
          stretchX: skewX,
          stretchY: skewY,
          tendrils: flare * 0.12,
        },
        CENTER + leanX,
        CENTER + leanY,
      );

      body.setAttribute("d", d);
      glow.setAttribute("d", d);

      // Glow answers the breath and any flare, but never runs hot.
      const luminance = 0.28 + breath * 0.06 + rouse * 0.16 + flare * 0.2;
      glow.style.opacity = luminance.toFixed(3);

      // Internal movement: the nucleus drifts against the body's lean, which
      // reads as mass shifting inside a membrane rather than a decal on top.
      nucleus.style.transform = `translate3d(${(leanX * 0.45).toFixed(2)}px, ${(
        leanY * 0.45
      ).toFixed(2)}px, 0)`;

      // --- ripple ------------------------------------------------------
      if (rippleAge < TIMING.ripple) {
        rippleAge += delta;
        const t = clamp(rippleAge / TIMING.ripple, 0, 1);
        ripple.setAttribute("r", (radius * (0.4 + t * 0.9)).toFixed(2));
        ripple.style.opacity = ((1 - t) * 0.5).toFixed(3);
      } else {
        ripple.style.opacity = "0";
      }
    });

    return unsubscribe;
  }, [inView, prefersReducedMotion, seed]);

  /** Pointer position normalised to -1..1 within the element. */
  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    pointer.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.current.y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
    pointer.current.inside = true;
  }

  const restingPath = membranePath(
    {
      points: SHAPE.points,
      radius: SHAPE.radius,
      wobble: SHAPE.wobble,
      time: 0,
      seed,
      speed: SHAPE.speed,
    },
    CENTER,
    CENTER,
  );

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width: size, height: size }}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerMove}
      onPointerLeave={() => {
        pointer.current.inside = false;
      }}
    >
      <svg
        viewBox={`0 0 ${VIEWBOX} ${VIEWBOX}`}
        width={size}
        height={size}
        role={label ? "img" : "presentation"}
        aria-label={label}
        aria-hidden={label ? undefined : true}
        style={{ display: "block", overflow: "visible" }}
      >
        <defs>
          {/* Translucent, not solid. A membrane holding something, read
              through by the rim rather than by a filled disc. */}
          <radialGradient id={`organism-body-${seed}`} cx="40%" cy="32%">
            <stop offset="0%" stopColor="var(--organism-highlight)" stopOpacity="0.3" />
            <stop offset="48%" stopColor="var(--organism-body)" stopOpacity="0.42" />
            <stop offset="100%" stopColor="var(--organism-body)" stopOpacity="0.12" />
          </radialGradient>
        </defs>

        {/* Bioluminescence along the membrane itself. Stroked, not filled:
            a filled blur turns the organism into a glowing marble, where the
            interior should stay dark and the light should live in the skin. */}
        <path
          ref={glowRef}
          d={restingPath}
          fill="none"
          stroke="var(--organism-glow)"
          strokeWidth="3.5"
          opacity="0.28"
          style={{ filter: "blur(4px)" }}
        />

        <path
          ref={bodyRef}
          d={restingPath}
          fill={`url(#organism-body-${seed})`}
          stroke="var(--organism-accent)"
          strokeOpacity="0.55"
          strokeWidth="0.9"
        />

        {/* Suspended matter. Small, dim, and slightly out of step with the body. */}
        <g ref={nucleusRef} style={{ willChange: "transform" }}>
          <circle cx={CENTER - 5} cy={CENTER + 3} r="4.5" fill="var(--organism-body)" opacity="0.55" />
          <circle cx={CENTER + 7} cy={CENTER - 6} r="2.6" fill="var(--organism-highlight)" opacity="0.3" />
        </g>

        <circle
          ref={rippleRef}
          cx={CENTER}
          cy={CENTER}
          r={SHAPE.radius}
          fill="none"
          stroke="var(--organism-accent)"
          strokeWidth="0.7"
          opacity="0"
        />
      </svg>
    </div>
  );
}
