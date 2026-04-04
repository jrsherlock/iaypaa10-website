import type { Metadata } from "next";
import { Creepster, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FilmGrain from "@/components/effects/FilmGrain";

const creepster = Creepster({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-creepster",
  display: "swap",
});

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
      className={`${creepster.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-void-black text-bone-white font-[family-name:var(--font-space)] antialiased">
        <FilmGrain />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
