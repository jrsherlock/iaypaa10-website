import { ImageResponse } from "next/og";
import { CONFERENCE } from "@/lib/constants";

// Default Open Graph / social-share card for every route. Rendered on
// brand colours rather than cropping the portrait poster art (which would
// lose the composition at 1200×630). See docs/design-philosophy.md.
export const alt =
  "IAYPAA X: Primordial Ooze. The 10th Annual Iowa Young People in AA Conference. August 14–16, 2026, Iowa City, Iowa.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0D0D0D",
          backgroundImage:
            "radial-gradient(circle at 18% 12%, rgba(95,173,86,0.22), transparent 42%), radial-gradient(circle at 86% 88%, rgba(247,129,84,0.16), transparent 46%)",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top eyebrow */}
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 10,
            textTransform: "uppercase",
            color: "#E8E6E1",
            opacity: 0.65,
          }}
        >
          {CONFERENCE.edition} · {CONFERENCE.fullName}
        </div>

        {/* Title block */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 132,
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: -2,
              color: "#E8E6E1",
            }}
          >
            {CONFERENCE.name}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 96,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: "#5FAD56",
              marginTop: 8,
            }}
          >
            {CONFERENCE.tagline}
          </div>
        </div>

        {/* Bottom detail bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            fontSize: 30,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#F2C14E",
          }}
        >
          <span style={{ display: "flex" }}>{CONFERENCE.date}</span>
          <span style={{ display: "flex", color: "#E8E6E1", opacity: 0.4 }}>
            ·
          </span>
          <span style={{ display: "flex" }}>{CONFERENCE.location}</span>
        </div>
      </div>
    ),
    size,
  );
}
