"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { DROPLETS, REVEAL, SHAPE, SPRING, TIMING } from "@/lib/organism/config";
import { usePrefersReducedMotion, useInView } from "@/lib/organism/hooks";
import { clamp, lerp, makeRandom, spring } from "@/lib/organism/noise";
import { membranePath } from "@/lib/organism/shape";
import { subscribe } from "@/lib/organism/ticker";

/**
 * A portrait cultured out of biomass.
 *
 * The portrait is never faded in. It sits fully opaque in the DOM from the
 * first paint, covered by a sheet of ooze; the reveal is that sheet noticing
 * the viewer, reaching, liquefying off the surface and retracting into the
 * corner — where it stays, alive, for as long as the page is open. Nothing
 * appears or disappears; one thing becomes another.
 *
 * Covering rather than masking is deliberate. An SVG mask driving a raster
 * image is inconsistent across engines, and a half-supported reveal would
 * leave some visitors staring at a blank square.
 */

type CulturedPortraitProps = {
  src: string;
  alt: string;
  /** Per-instance seed; keeps this organism out of step with the others. */
  seed: number;
  /** Intrinsic size of the source image. Square. */
  pixels: number;
};

const VIEWBOX = 100;
const CENTER = VIEWBOX / 2;

/** Accelerate, then decelerate. Nothing here moves at constant velocity. */
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/** A 0..1 bump peaking at `centre` — used for one-off swells like tendrils. */
function bump(t: number, centre: number, width: number): number {
  const distance = Math.abs(t - centre) / width;
  return distance >= 1 ? 0 : Math.cos(distance * Math.PI * 0.5) ** 2;
}

export default function CulturedPortrait({
  src,
  alt,
  seed,
  pixels,
}: CulturedPortraitProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [containerRef, inView] = useInView<HTMLDivElement>({
    once: true,
    threshold: 0.35,
  });

  const sheetRef = useRef<SVGPathElement | null>(null);
  const glowRef = useRef<SVGPathElement | null>(null);
  const dropletsRef = useRef<SVGGElement | null>(null);
  const displacementRef = useRef<SVGFEDisplacementMapElement | null>(null);

  const pointer = useRef({ x: 0, y: 0, inside: false });

  useEffect(() => {
    if (prefersReducedMotion) return;

    const sheet = sheetRef.current;
    const glow = glowRef.current;
    const droplets = dropletsRef.current;
    const displacement = displacementRef.current;
    if (!sheet || !glow || !droplets || !displacement) return;

    const random = makeRandom(seed);
    const phase = random() * 1000;
    const breathPeriod =
      TIMING.idlePulseMin + random() * (TIMING.idlePulseMax - TIMING.idlePulseMin);

    // Droplet trajectories, fixed per organism so the separation is repeatable.
    const dropletSeeds = Array.from({ length: DROPLETS }, () => ({
      angle: random() * Math.PI * 2,
      distance: 8 + random() * 12,
      radius: 1.4 + random() * 2.2,
      delay: random() * 160,
    }));
    const dropletNodes = Array.from(droplets.children) as SVGCircleElement[];

    /** Sequence clock. Stays null until the card is actually on screen. */
    let revealClock: number | null = null;
    let filterAttached = true;

    let leanX = 0;
    let leanXVelocity = 0;
    let leanY = 0;
    let leanYVelocity = 0;
    let flare = 0;
    let nextMicroEvent =
      TIMING.microEventMin + random() * (TIMING.microEventMax - TIMING.microEventMin);

    const unsubscribe = subscribe((elapsed, delta) => {
      const seconds = (elapsed + phase) / 1000;
      const breath = Math.sin(((elapsed + phase) / breathPeriod) * Math.PI * 2);

      if (revealClock === null && inView) revealClock = 0;
      if (revealClock !== null && revealClock < TIMING.reveal) {
        revealClock = Math.min(revealClock + delta, TIMING.reveal);
      }

      // 0 while dormant, 1 once fully retracted.
      const raw = revealClock === null ? 0 : revealClock / TIMING.reveal;
      const progress = easeInOutCubic(raw);
      const settled = raw >= 1;

      // --- micro-events, once it has settled ---------------------------
      if (settled) {
        nextMicroEvent -= delta;
        if (nextMicroEvent <= 0) {
          flare = 1;
          nextMicroEvent =
            TIMING.microEventMin +
            random() * (TIMING.microEventMax - TIMING.microEventMin);
        }
        flare = Math.max(0, flare - delta / TIMING.ripple);
      }

      // --- pointer attention, once it has settled ----------------------
      const attentive = settled && pointer.current.inside;
      const leanTargetX = attentive ? pointer.current.x * SHAPE.leanDistance : 0;
      const leanTargetY = attentive ? pointer.current.y * SHAPE.leanDistance : 0;
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

      // --- the sheet ----------------------------------------------------
      const radius =
        lerp(REVEAL.coveredRadius, REVEAL.cornerRadius, progress) *
        (settled ? 1 + breath * 0.05 + flare * 0.04 : 1);
      const cx = lerp(CENTER, REVEAL.cornerX, progress) + leanX;
      const cy = lerp(CENTER, REVEAL.cornerY, progress) + leanY;

      // Reaching happens early, before the sheet starts to let go.
      const tendrils = bump(raw, REVEAL.tendrilPeak, 0.22) * 0.5;
      const agitation = revealClock === null ? 0 : bump(raw, 0.5, 0.6);
      const wobble =
        SHAPE.wobble +
        (SHAPE.wobbleRoused - SHAPE.wobble) * Math.max(agitation, attentive ? 1 : 0) +
        flare * 0.05;

      const d = membranePath(
        {
          points: SHAPE.points,
          radius,
          wobble,
          time: seconds,
          seed,
          speed: SHAPE.speed + (SHAPE.speedRoused - SHAPE.speed) * agitation,
          tendrils,
        },
        cx,
        cy,
      );

      sheet.setAttribute("d", d);
      glow.setAttribute("d", d);

      // The sheet thins as it lets go, so the portrait reads through the ooze
      // before it is uncovered — cultured inside it rather than unveiled from
      // behind it. Held fully opaque until the retraction is properly underway
      // so nothing leaks early.
      const thinning = clamp((raw - 0.4) / 0.6, 0, 1);
      sheet.style.opacity = lerp(1, REVEAL.settledOpacity, thinning).toFixed(3);
      glow.style.opacity = (
        0.22 +
        breath * 0.05 +
        flare * 0.22 +
        (attentive ? 0.16 : 0)
      ).toFixed(3);

      // --- liquid edge ---------------------------------------------------
      // The displacement filter is the expensive part, so it only exists
      // while the sheet is actually flowing. Once settled it is detached and
      // the corner organism costs a path write per frame and nothing else.
      if (!settled) {
        const scale = Math.sin(raw * Math.PI) * REVEAL.displacement;
        displacement.setAttribute("scale", scale.toFixed(2));
      } else if (filterAttached) {
        sheet.removeAttribute("filter");
        filterAttached = false;
      }

      // --- droplets -------------------------------------------------------
      // They separate as the sheet retreats and dissolve where they land.
      dropletNodes.forEach((node, index) => {
        const config = dropletSeeds[index];
        const localMs =
          (revealClock ?? 0) - REVEAL.dropletRelease * TIMING.reveal - config.delay;
        const t = clamp(localMs / TIMING.droplet, 0, 1);

        if (t <= 0 || t >= 1) {
          node.style.opacity = "0";
          return;
        }

        const travel = config.distance * easeInOutCubic(t);
        node.setAttribute("cx", (cx + Math.cos(config.angle) * travel).toFixed(2));
        node.setAttribute("cy", (cy + Math.sin(config.angle) * travel).toFixed(2));
        node.setAttribute("r", (config.radius * (1 - t * 0.7)).toFixed(2));
        node.style.opacity = ((1 - t) * 0.7).toFixed(3);
      });
    });

    return unsubscribe;
  }, [inView, prefersReducedMotion, seed]);

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    pointer.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.current.y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
    pointer.current.inside = true;
  }

  const coveringPath = membranePath(
    {
      points: SHAPE.points,
      radius: REVEAL.coveredRadius,
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
      className="relative"
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerMove}
      onPointerLeave={() => {
        pointer.current.inside = false;
      }}
    >
      <Image
        src={src}
        alt={alt}
        width={pixels}
        height={pixels}
        className="w-full h-auto"
        sizes="(min-width: 640px) 36rem, 100vw"
        priority
      />

      {/*
        Rendered on the server, not gated behind `prefersReducedMotion`.
        Mounting it only after hydration would show the portrait uncovered for
        a frame and then cover it, spoiling the reveal before it runs. Reduced
        motion hides it in CSS instead, which applies before first paint.
      */}
      <svg
        data-ooze-sheet
        viewBox={`0 0 ${VIEWBOX} ${VIEWBOX}`}
        preserveAspectRatio="none"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none"
      >
          <defs>
            <filter id={`ooze-liquefy-${seed}`} x="-25%" y="-25%" width="150%" height="150%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency={REVEAL.turbulence}
                numOctaves={2}
                seed={seed}
                result="churn"
              />
              <feDisplacementMap
                ref={displacementRef}
                in="SourceGraphic"
                in2="churn"
                scale="0"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
            <radialGradient id={`ooze-sheet-${seed}`} cx="40%" cy="32%">
              <stop offset="0%" stopColor="var(--organism-highlight)" stopOpacity="0.32" />
              <stop offset="45%" stopColor="var(--organism-body)" stopOpacity="0.97" />
              <stop offset="100%" stopColor="var(--organism-body)" stopOpacity="1" />
            </radialGradient>
          </defs>

          {/* Bioluminescence along the edge of the sheet. Stroked so the light
              lives in the skin; CSS blur only, since a second displacement
              pass would double the filter cost for no visible gain. */}
          <path
            ref={glowRef}
            d={coveringPath}
            fill="none"
            stroke="var(--organism-glow)"
            strokeWidth="3"
            opacity="0.22"
            style={{ filter: "blur(5px)" }}
          />

          <path
            ref={sheetRef}
            d={coveringPath}
            fill={`url(#ooze-sheet-${seed})`}
            filter={`url(#ooze-liquefy-${seed})`}
          />

        <g ref={dropletsRef}>
          {Array.from({ length: DROPLETS }, (_, index) => (
            <circle
              key={index}
              cx={CENTER}
              cy={CENTER}
              r="2"
              fill="var(--organism-glow)"
              opacity="0"
            />
          ))}
        </g>
      </svg>

      {/*
        Without scripting the sheet would never retract, so hide it outright
        and show the portrait plainly.
      */}
      <noscript>
        <style>{`[data-ooze-sheet] { display: none; }`}</style>
      </noscript>
    </div>
  );
}
