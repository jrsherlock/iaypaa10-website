import type { Metadata } from "next";
import {
  Space_Grotesk,
  JetBrains_Mono,
  Anton,
  Special_Elite,
  Newsreader,
} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

// Heavy condensed display — structure formed out of the soft stuff; the
// primary headline face (see docs/design-philosophy.md §3).
const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

// Stamped typewriter — for ticket stubs, dispatches, AA-flyer captions.
const specialElite = Special_Elite({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-typewriter",
  display: "swap",
});

// Editorial serif — reserved for the moments the costume comes off and
// the site speaks plainly about recovery.
const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-news",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "IAYPAA X — Primordial Ooze | Iowa City, August 2026",
    template: "%s | IAYPAA X",
  },
  description:
    "IAYPAA X — the 10th Annual Iowa Young People in AA Conference. August 2026 in Iowa City, Iowa. Theme: Primordial Ooze.",
  keywords: [
    "IAYPAA",
    "Young People in AA",
    "Iowa AA",
    "AA Conference",
    "Alcoholics Anonymous",
    "YPAA",
    "Iowa City",
    "Primordial Ooze",
  ],
  openGraph: {
    title: "IAYPAA X — Primordial Ooze",
    description:
      "The 10th Annual Iowa Young People in AA Conference. August 2026, Iowa City, Iowa.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${anton.variable} ${specialElite.variable} ${newsreader.variable}`}
    >
      <body className="min-h-screen bg-void-black text-bone-white font-[family-name:var(--font-space)] antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
