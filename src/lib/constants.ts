export const CONFERENCE = {
  name: "IAYPAA X",
  fullName: "Iowa Young People in Alcoholics Anonymous",
  tagline: "Primordial Ooze",
  year: 2026,
  edition: "10th Annual",
  location: "Iowa City, Iowa",
  date: "August 14–16, 2026",
  countdownTarget: new Date("2026-08-14T00:00:00"),
  venue: {
    name: "The Highlander Hotel",
    address: "2525 Highlander Place, Iowa City, Iowa 52245",
    phone: "319-354-2000",
    website: "https://www.highlanderhotel.us",
  },
  email: "iaypaa@gmail.com",
  social: {
    instagram: "https://www.instagram.com/iaypaa",
  },
  // Canonical production URL for this site (used for SEO: metadataBase,
  // sitemap, robots, OG). Keep this in sync with the deployed domain.
  siteUrl: "https://2026.iaypaa.org",
  // Legacy AA Advisory WordPress site — surfaced as the "iaypaa.org" link
  // in the footer. Not the canonical site; do not use for SEO.
  website: "https://iaypaa.org",
} as const;

// Gate the published weekend program (day-by-day times, panel leads, featured
// speakers, workshop list). Flip to `true` once the AA Advisory committee has
// approved the program — surfaces the schedule on /schedule and the
// "See the program" pointer on /speakers.
export const PROGRAM_PUBLIC: boolean = false;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Schedule", href: "/schedule" },
  { label: "Speakers", href: "/speakers" },
  { label: "Hotel & Venue", href: "/hotel" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Past Conferences", href: "/past-conferences" },
  { label: "Outreach", href: "/outreach" },
  { label: "Registration", href: "/registration" },
  { label: "Pre-Conference Events", href: "/pre-conference" },
  { label: "Merch", href: "/merch" },
  { label: "Stay In the Loop", href: "/#mailing-list" },
] as const;

// Grouped nav used by the desktop Navbar. The flat NAV_LINKS above is still
// used by the Footer and MobileMenu.
export type NavGroupItem =
  | { label: string; href: string }
  | {
      label: string;
      children: readonly { label: string; href: string }[];
    };

export const NAV_GROUPS: readonly NavGroupItem[] = [
  { label: "Home", href: "/" },
  {
    label: "IAYPAA X Conference Info",
    children: [
      { label: "Registration", href: "/registration" },
      { label: "Schedule", href: "/schedule" },
      { label: "Speakers", href: "/speakers" },
      { label: "Hotel & Venue", href: "/hotel" },
      { label: "About", href: "/about" },
      { label: "FAQ", href: "/faq" },
      { label: "Past Conferences", href: "/past-conferences" },
      { label: "Outreach", href: "/outreach" },
    ],
  },
  { label: "Pre-Conference Events", href: "/pre-conference" },
  { label: "Merch", href: "/merch" },
  { label: "Stay In the Loop", href: "/#mailing-list" },
] as const;

export const PAST_CONFERENCES = [
  { year: 2017, edition: "I", location: "Des Moines, IA", theme: "The Beginning" },
  { year: 2018, edition: "II", location: "Iowa City, IA", theme: "A New Hope" },
  { year: 2019, edition: "III", location: "Cedar Rapids, IA", theme: "Under the Big Top" },
  { year: 2020, edition: "IV", location: "Virtual", theme: "Together Apart" },
  { year: 2021, edition: "V", location: "Des Moines, IA", theme: "The Roaring Recovery" },
  { year: 2022, edition: "VI", location: "Iowa City, IA", theme: "Camp IAYPAA" },
  { year: 2023, edition: "VII", location: "Cedar Rapids, IA", theme: "IAYPAA in Wonderland" },
  { year: 2024, edition: "VIII", location: "Des Moines, IA", theme: "IAYPAA in Space" },
  { year: 2025, edition: "IX", location: "Iowa City, IA", theme: "Disco Fever" },
  { year: 2026, edition: "X", location: "Iowa City, IA", theme: "Primordial Ooze" },
] as const;

export type PreConferenceEvent = {
  id: string;
  title: string;
  /** Local date as YYYY-MM-DD. Drives sort + the past/upcoming split. */
  date: string;
  /** Optional end date for multi-day events (YYYY-MM-DD). */
  endDate?: string;
  time?: string;
  location: string;
  city?: string;
  description: string;
  /**
   * Optional flyer to download. Drop the file in `public/flyers/` and set
   * this to its public path, e.g. "/flyers/speakers-sweets-bake-off.pdf".
   * The modal shows a Download button only when this is set.
   */
  flyer?: string;
  /** Optional extra link — RSVP/details for upcoming, recap for past. */
  link?: string;
  linkLabel?: string;
};

// Lead-up events before the Aug 14–16, 2026 conference, taken from the
// Summer 2026 events poster. Past events stay here as an archive (greyed
// out, still openable); upcoming events show in full colour. The page
// sorts and splits automatically by date.
//
// To add a downloadable flyer: put the file in `public/flyers/` and set
// `flyer: "/flyers/<filename>"` on the event below.
export const PRE_CONFERENCE_EVENTS: readonly PreConferenceEvent[] = [
  {
    id: "speakers-sweets-bake-off",
    title: "Speakers & Sweets Bake-Off",
    date: "2026-06-14",
    location: "Last Chance AA Group",
    city: "4711 44th St, Suite 5, Rock Island, IL",
    description:
      "A speaker meeting and a dessert bake-off — bring something sweet, bring a friend. Fellowship and a little friendly competition for IAYPAA X.",
  },
  {
    id: "aa-pride-event",
    title: "AA Pride Event",
    date: "2026-06-27",
    location: "Iowa City, IA",
    description:
      "An AA Pride gathering. Proceeds go to the Iowa City IAYPAA Conference. All are welcome.",
  },
  {
    id: "picnic-in-the-park",
    title: "Picnic in the Park",
    date: "2026-07-04",
    time: "1:00–4:00 PM",
    location: "Lower City Park",
    city: "200 Park Rd, Iowa City, IA",
    description:
      "A Fourth of July picnic in the park — food, fellowship, and sober fun in the afternoon sun.",
  },
  {
    id: "yoga-meditation-in-the-park",
    title: "Yoga & Meditation in the Park",
    date: "2026-07-11",
    time: "10:00 AM–12:00 PM",
    location: "City Park",
    city: "200 Park Rd, Iowa City, IA",
    description:
      "A morning of yoga and meditation in the park. All experience levels welcome — come as you are.",
  },
  {
    id: "virtual-aa-panel",
    title: "Virtual AA Panel",
    date: "2026-07-17",
    time: "7:00–8:30 PM",
    location: "On Zoom",
    description:
      "A virtual AA panel for anyone who can't make it in person. Join from anywhere.",
  },
  {
    id: "kick-off-spaghetti-dinner",
    title: "Kick-Off Event (Spaghetti Dinner)",
    date: "2026-08-01",
    time: "5:00–8:00 PM",
    location: "Zion Lutheran Church",
    city: "310 N Johnson St, Iowa City, IA",
    description:
      "The kick-off spaghetti dinner — the last big gathering before the doors open for IAYPAA X. Eat well, then we go.",
  },
];

export const FAQ_ITEMS = [
  {
    question: "What is IAYPAA?",
    answer:
      "IAYPAA stands for Iowa Young People in Alcoholics Anonymous. We are a fellowship of young people in AA who organize an annual conference to carry the message of recovery to young alcoholics across Iowa and beyond.",
  },
  {
    question: "Do I have to be 'young' to attend?",
    answer:
      "Absolutely not! While our conference focuses on young people in AA, anyone with a desire to stop drinking or who supports someone in recovery is welcome. There is no age requirement.",
  },
  {
    question: "What happens at an IAYPAA conference?",
    answer:
      "Our conferences feature speaker meetings, panel discussions, workshops, fellowship events, and social activities — all centered around recovery. Expect a weekend of connection, growth, and fun in sobriety.",
  },
  {
    question: "How much does it cost to attend?",
    answer:
      "Registration is open. Early Bird is $20 for a full weekend pass — that price goes up, so get in before it does. At-the-door pricing will be announced closer to the conference. Scholarships are available and no one is turned away for lack of funds — see the Registration page to reserve your seat or to ask about a scholarship, quietly.",
  },
  {
    question: "Where will IAYPAA X be held?",
    answer:
      "IAYPAA X will be held August 14–16, 2026 at The Highlander Hotel, 2525 Highlander Place, Iowa City, Iowa 52245. Check the Hotel & Venue page for details and booking info!",
  },
  {
    question: "Is this an AA event?",
    answer:
      "Yes. IAYPAA conferences are organized in the spirit of AA's Twelve Traditions. We are self-supporting through our own contributions and do not accept outside funding.",
  },
  {
    question: "How can I get involved?",
    answer:
      "We'd love your help! Visit our Outreach page to learn about committee positions, or reach out to us directly. Service opportunities are a great way to get involved and give back.",
  },
  {
    question: "What is the Primordial Ooze theme?",
    answer:
      "Primordial Ooze is the theme of our 10th annual conference. It's where life begins — the formless place every one of us started from, and the new life that comes up out of it when you stop trying to do it alone. Ten years of IAYPAA, and a story about coming up out of the dark.",
  },
] as const;
