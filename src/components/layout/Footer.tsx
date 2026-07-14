import Link from "next/link";
import { NAV_LINKS, CONFERENCE } from "@/lib/constants";

export default function Footer() {
  // Split nav links into two columns for quick links
  const quickLinks = NAV_LINKS.slice(0, 5);
  const moreLinks = NAV_LINKS.slice(5);

  return (
    <footer className="relative bg-dark-ooze">
      {/* Dripping slime top border SVG */}
      <div className="absolute top-0 left-0 w-full -translate-y-[99%]" aria-hidden="true">
        <svg
          className="w-full h-8"
          viewBox="0 0 1200 32"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background fill that connects to footer */}
          <rect y="24" width="1200" height="8" fill="#0A1F0A" />
          {/* Wavy slime border */}
          <path
            d="M0,24 Q50,24 75,20 Q100,16 120,22 Q150,28 180,18 Q200,12 230,20 Q260,28 300,22 Q330,16 360,24 Q390,28 420,16 Q450,8 480,20 Q510,28 540,22 Q570,16 600,24 Q630,28 660,18 Q690,10 720,22 Q750,28 780,20 Q810,14 840,24 Q870,28 900,18 Q930,12 960,22 Q990,28 1020,20 Q1050,14 1080,24 Q1110,28 1140,20 Q1170,16 1200,24 L1200,32 L0,32 Z"
            fill="#0A1F0A"
          />
          {/* Green highlight on the slime edge */}
          <path
            d="M0,24 Q50,24 75,20 Q100,16 120,22 Q150,28 180,18 Q200,12 230,20 Q260,28 300,22 Q330,16 360,24 Q390,28 420,16 Q450,8 480,20 Q510,28 540,22 Q570,16 600,24 Q630,28 660,18 Q690,10 720,22 Q750,28 780,20 Q810,14 840,24 Q870,28 900,18 Q930,12 960,22 Q990,28 1020,20 Q1050,14 1080,24 Q1110,28 1140,20 Q1170,16 1200,24"
            fill="none"
            stroke="#5FAD56"
            strokeWidth="1.5"
            strokeOpacity="0.4"
          />
          {/* Drip drops hanging from the wavy line */}
          <ellipse cx="230" cy="22" rx="3" ry="6" fill="#5FAD56" fillOpacity="0.15" />
          <ellipse cx="480" cy="22" rx="2.5" ry="8" fill="#4D9078" fillOpacity="0.12" />
          <ellipse cx="690" cy="12" rx="3" ry="7" fill="#5FAD56" fillOpacity="0.15" />
          <ellipse cx="960" cy="24" rx="2" ry="5" fill="#4D9078" fillOpacity="0.1" />
        </svg>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: About IAYPAA */}
          <div className="lg:col-span-1">
            <h3 className="font-anton text-2xl text-ooze-green glow-text-subtle mb-4">
              {CONFERENCE.name}
            </h3>
            <p className="text-sm text-bone-white/60 leading-relaxed mb-3">
              {CONFERENCE.fullName}
            </p>
            <p className="text-sm text-bone-white/60 leading-relaxed">
              {CONFERENCE.edition} &bull;{" "}
              <span className="text-swamp-teal/80">{CONFERENCE.tagline}</span>
            </p>
            <p className="mt-2 text-sm text-bone-white/50 font-[family-name:var(--font-mono)]">
              {CONFERENCE.location} &bull; {CONFERENCE.date}
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-ooze-green/80 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-bone-white/60 transition-colors duration-200 hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: More Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-ooze-green/80 mb-4">
              More
            </h4>
            <ul className="space-y-2">
              {moreLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-bone-white/60 transition-colors duration-200 hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Connect */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-ooze-green/80 mb-4">
              Connect
            </h4>
            <ul className="space-y-3">
              {/* Email */}
              <li>
                <a
                  href={`mailto:${CONFERENCE.email}`}
                  className="group flex items-center gap-2 text-sm text-bone-white/60 transition-colors duration-200 hover:text-ember"
                >
                  <svg
                    className="h-4 w-4 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>
                  {CONFERENCE.email}
                </a>
              </li>
              {/* Website */}
              <li>
                <a
                  href={CONFERENCE.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 text-sm text-bone-white/60 transition-colors duration-200 hover:text-ember"
                >
                  <svg
                    className="h-4 w-4 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-4.247m0 0A8.966 8.966 0 013 12c0-1.264.26-2.466.727-3.559"
                    />
                  </svg>
                  iaypaa.org
                </a>
              </li>
              {/* Donate — Seventh Tradition, self-supporting */}
              <li>
                <a
                  href={CONFERENCE.cashApp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 text-sm text-bone-white/60 transition-colors duration-200 hover:text-gold"
                >
                  <svg
                    className="h-4 w-4 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Donate &middot; {CONFERENCE.cashApp.handle}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-toxic-green/30 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-bone-white/40">
            &copy; {CONFERENCE.year} IAYPAA. All rights reserved.
          </p>
          <p className="text-xs text-bone-white/30">
            Made with ooze in Iowa
          </p>
        </div>
      </div>
    </footer>
  );
}
