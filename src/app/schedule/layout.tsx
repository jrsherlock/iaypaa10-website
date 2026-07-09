import type { Metadata } from "next";
import type { ReactNode } from "react";

// The schedule page is a client component, so its metadata lives here on the
// server-rendered segment layout (otherwise it inherits the generic site
// default title/description).
export const metadata: Metadata = {
  title: "Schedule",
  description:
    "The weekend program for IAYPAA X, August 14–16, 2026 in Iowa City: speaker meetings, step panels, workshops, the marathon meeting, and the Saturday night countdown.",
  alternates: { canonical: "/schedule" },
};

export default function ScheduleLayout({ children }: { children: ReactNode }) {
  return children;
}
