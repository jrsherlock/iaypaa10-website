import type { Metadata } from "next";
import type { ReactNode } from "react";
import JsonLd from "@/components/seo/JsonLd";
import { faqJsonLd } from "@/lib/seo";

// The FAQ page is a client component, so its metadata lives here on the
// server-rendered segment layout. This layout also emits FAQPage structured
// data (built from the same FAQ_ITEMS the page renders) for Q&A rich results.
export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Common questions about IAYPAA X: who can attend, what it costs, the Primordial Ooze theme, whether it's an AA event, and how to get involved.",
  alternates: { canonical: "/faq" },
};

export default function FaqLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd data={faqJsonLd()} />
      {children}
    </>
  );
}
