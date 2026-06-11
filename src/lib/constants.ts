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
  email: "iaypaa10@gmail.com",
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
  { label: "Hospitality Suite", href: "/hospitality" },
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
      { label: "Hospitality Suite", href: "/hospitality" },
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
  /**
   * Optional web-friendly thumbnail (JPG/PNG) of the flyer. When set, a
   * small pinned-poster preview shows on the event card and a larger
   * clickable preview appears at the top of the modal (downloads the
   * `flyer` PDF on click). Drop a ~1200px-wide JPG next to the PDF in
   * `public/flyers/`.
   */
  flyerThumb?: string;
  /** Optional extra link — RSVP/details for upcoming, recap for past. */
  link?: string;
  linkLabel?: string;
};

// Lead-up events before the Aug 14–16, 2026 conference, taken from the
// Summer 2026 events poster. Past events stay here as an archive (greyed
// out, still openable); upcoming events show in full colour. The page
// sorts and splits automatically by date.
//
// To add a downloadable flyer: put the PDF in `public/flyers/` and set
// `flyer: "/flyers/<name>.pdf"` on the event below. For a web thumbnail
// (shown on the card + at the top of the modal), also drop a JPG/PNG
// alongside it and set `flyerThumb: "/flyers/<name>.jpg"`.
export const PRE_CONFERENCE_EVENTS: readonly PreConferenceEvent[] = [
  {
    id: "speakers-sweets-bake-off",
    title: "Sweet Speakers and Sweet Bake Off",
    date: "2026-06-14",
    time: "1:00–4:00 PM",
    location: "The Last Chance",
    city: "4711 44th St, Unit 5, Rock Island, IL",
    description:
      "Bring your favorite sweet to share and win a chance at becoming the IAYPAA X Tasty Sweet Baker Winner. $5 donation to vote for your favorite. 50/50 and basket raffle. Walking tacos and drinks for sale. Speaker panel at 2 PM: Erik T. (Big Book Study), Bethany K. (Bettendorf), Tyler V. (Last Chance), Jennifer R. (Camden Serenity).",
    flyer: "/flyers/sweet-speakers-bake-off.pdf",
    flyerThumb: "/flyers/sweet-speakers-bake-off.jpg",
  },
  {
    id: "aa-pride-event",
    title: "AA Pride Party",
    date: "2026-06-27",
    time: "4:00–7:00 PM",
    location: "Happy Hollow Park",
    city: "800 Brown St, Iowa City, IA",
    description:
      "Iowa City's LGBTQ+ AA invites you to an AA Pride Party. Speaker at 5:30. Bingo, raffle, snacks and beverages provided. All are welcome.",
    flyer: "/flyers/aa-pride-party.pdf",
    flyerThumb: "/flyers/aa-pride-party.jpg",
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

// Hospitality suite host sign-up. Home groups claim a meal/snack slot in the
// suite at the Highlander via SignUpGenius. Live availability lives on
// SignUpGenius — the list below is the slot lineup, not booking state, so it
// never goes stale as groups claim slots.
export const HOSPITALITY_SIGNUP_URL_ID = "10C0F45A8AB2AA5FACE9-64184651-iaypaa";

export const HOSPITALITY_SIGNUP_URL = `https://www.signupgenius.com/go/${HOSPITALITY_SIGNUP_URL_ID}#/`;

/**
 * Deep link straight to the SignUpGenius sign-up form with one slot
 * preselected (skips the slot-picking step on the sheet).
 */
export function hospitalitySlotSignupUrl(slotItemId: number): string {
  return `https://www.signupgenius.com/index.cfm?go=s.PreProcessSignup&URLID=${HOSPITALITY_SIGNUP_URL_ID}&siid=${slotItemId}`;
}

export type HospitalitySlot = {
  /**
   * SignUpGenius slot-item id — matches this slot to live claimed/open
   * status fetched in `src/lib/signupgenius.ts`. Slots added on
   * SignUpGenius later must be added here too (with their id) to show up.
   */
  slotItemId: number;
  time: string;
  title: string;
  note: string;
};

export const HOSPITALITY_SLOTS: readonly {
  day: string;
  date: string;
  slots: readonly HospitalitySlot[];
}[] = [
  {
    day: "FRI",
    date: "Aug 14",
    slots: [
      { time: "3–5 PM", slotItemId: 1803547928, title: "Slime Time Social Hour", note: "Kickoff snacks" },
      { time: "5–7 PM", slotItemId: 1802234271, title: "The Primordial Feast", note: "Dinner" },
      { time: "7–9 PM", slotItemId: 1803559378, title: "Goo-Tox and Fellowship", note: "Snacks" },
      { time: "10 PM–12 AM", slotItemId: 1803562327, title: "Swampcore Social Club", note: "Snacks" },
    ],
  },
  {
    day: "SAT",
    date: "Aug 15",
    slots: [
      { time: "12–4 AM", slotItemId: 1803578204, title: "Primordial Pajama Party", note: "Late-night snacks" },
      {
        time: "7–10 AM",
        slotItemId: 1803586634, title: "Muckfast Club",
        note: "Supplemental breakfast — the Highlander serves a complimentary breakfast",
      },
      { time: "10 AM–12 PM", slotItemId: 1803587728, title: "The Snackasaurus Rex Cafe", note: "Snacks" },
      { time: "12–2 PM", slotItemId: 1803601029, title: "Lunch from the Lagoon", note: "Lunch" },
      { time: "2–5 PM", slotItemId: 1803600974, title: "The Oozy Snackateria", note: "Snacks" },
      { time: "5–7 PM", slotItemId: 1803605598, title: "The Big Bang Banquet", note: "Dinner" },
      { time: "7–10 PM", slotItemId: 1803606849, title: "Swamp Stomp Social", note: "Snacks" },
      { time: "10 PM–12 AM", slotItemId: 1803608370, title: "Snackasaurus Night Shift", note: "Late-night snacks" },
    ],
  },
  {
    day: "SUN",
    date: "Aug 16",
    slots: [
      { time: "12–4 AM", slotItemId: 1803612495, title: "Midnight in the Mire Munchies", note: "Snacks for the night owls" },
      {
        time: "7–10 AM",
        slotItemId: 1803613557, title: "Bogside Breakfast",
        note: "Supplemental breakfast — the Highlander serves a complimentary breakfast",
      },
      { time: "10–11 AM", slotItemId: 1803617235, title: "The Muck Stops Here (For Now)", note: "Treats for the road" },
    ],
  },
] as const;

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
      "Yes. IAYPAA conferences are organized in the spirit of AA's Twelve Traditions. We are self-supporting through our own contributions and do not accept outside funding. A few documents from the broader fellowship — Bill W.'s letters and the AA General Service Office bulletins — explain where young-people's conferences sit inside A.A.",
    link: { label: "See the references on About", href: "/about#where-this-comes-from" },
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
