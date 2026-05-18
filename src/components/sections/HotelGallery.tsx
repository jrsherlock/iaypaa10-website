"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

/**
 * HotelGallery — responsive thumbnail grid + accessible lightbox.
 *
 * The file list is read on the server (see hotel/page.tsx) and passed in,
 * so the grid renders with zero JS; only the lightbox needs the client.
 * Keyboard: Esc closes, ←/→ navigate, focus trap + restore, body scroll
 * locked while open. Full-screen on phones, centred on desktop.
 */
export default function HotelGallery({ images }: { images: string[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const open = useCallback((i: number) => setIndex(i), []);
  const close = useCallback(() => setIndex(null), []);
  const prev = useCallback(
    () => setIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length)),
    [images.length],
  );
  const next = useCallback(
    () => setIndex((i) => (i === null ? i : (i + 1) % images.length)),
    [images.length],
  );

  useEffect(() => {
    if (index === null) return;
    const prevActive = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "Tab") {
        const f = dialogRef.current?.querySelectorAll<HTMLElement>(
          "button:not([disabled])",
        );
        if (!f || f.length === 0) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      prevActive?.focus?.();
    };
  }, [index, close, prev, next]);

  if (images.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => open(i)}
            aria-haspopup="dialog"
            aria-label={`Open photo ${i + 1} of ${images.length}`}
            className="group relative aspect-[3/2] overflow-hidden border border-ooze-green/20 bg-void-black/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-ooze-green cursor-pointer"
          >
            <Image
              src={src}
              alt={`The Highlander Hotel — photo ${i + 1}`}
              fill
              sizes="(min-width:1024px) 22vw, (min-width:640px) 31vw, 47vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <span className="absolute inset-0 bg-void-black/0 group-hover:bg-void-black/15 transition-colors" />
          </button>
        ))}
      </div>

      {index !== null ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`Hotel photo ${index + 1} of ${images.length}`}
          ref={dialogRef}
        >
          <div
            className="absolute inset-0 bg-void-black/90 backdrop-blur-sm"
            onClick={close}
            aria-hidden="true"
          />

          <div className="relative w-full h-full sm:h-auto sm:max-w-5xl flex flex-col">
            {/* Top bar */}
            <div className="relative z-10 flex items-center justify-between px-4 py-3 sm:px-0 sm:pb-4">
              <span className="font-typewriter text-xs tracking-[0.25em] uppercase text-bone-white/60">
                {index + 1} / {images.length}
              </span>
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                aria-label="Close gallery"
                className="h-9 w-9 flex items-center justify-center rounded-full text-bone-white/80 hover:text-gold hover:bg-toxic-green/40 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ooze-green cursor-pointer"
              >
                <span aria-hidden="true" className="text-xl leading-none">
                  ×
                </span>
              </button>
            </div>

            {/* Image + nav */}
            <div className="relative flex-1 sm:flex-none flex items-center justify-center">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous photo"
                className="absolute left-2 sm:-left-14 z-10 h-11 w-11 flex items-center justify-center rounded-full bg-void-black/60 text-bone-white/80 hover:text-gold hover:bg-toxic-green/50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ooze-green cursor-pointer"
              >
                <span aria-hidden="true" className="text-2xl leading-none">
                  ‹
                </span>
              </button>

              <div className="relative w-full h-[70vh] sm:h-auto sm:aspect-[3/2] sm:max-h-[78vh]">
                <Image
                  src={images[index]}
                  alt={`The Highlander Hotel — photo ${index + 1}`}
                  fill
                  sizes="(min-width:640px) 64rem, 100vw"
                  className="object-contain sm:rounded-lg"
                  priority
                />
              </div>

              <button
                type="button"
                onClick={next}
                aria-label="Next photo"
                className="absolute right-2 sm:-right-14 z-10 h-11 w-11 flex items-center justify-center rounded-full bg-void-black/60 text-bone-white/80 hover:text-gold hover:bg-toxic-green/50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ooze-green cursor-pointer"
              >
                <span aria-hidden="true" className="text-2xl leading-none">
                  ›
                </span>
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
