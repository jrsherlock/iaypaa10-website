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
    name: "Graduate by Hilton Iowa City",
    address: "210 S Dubuque St, Iowa City, Iowa 52240",
    phone: "1-833-472-3468",
    website: "https://www.hilton.com/en/hotels/cidgigu-graduate-iowa-city/",
  },
  email: "iaypaa10@gmail.com",
  social: {
    instagram: "https://www.instagram.com/iaypaa",
  },
  // Seventh-Tradition donations (self-supporting through our own
  // contributions). Surfaced on the home page donate section + footer.
  cashApp: {
    handle: "$IAYPAAX",
    url: "https://cash.app/$IAYPAAX",
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
export const PROGRAM_PUBLIC: boolean = true;

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

// Sources of truth: locations/years from the IAYPAA bid brochure ("Where
// IAYPAA Has Been"); themes from the iaypaa.org recordings archive
// (page_id=2282). IAYPAA was established in 2016 (first held in Des Moines);
// 2020 had no conference (COVID), which makes 2026 the 10th annual. Themes for
// 2016, 2018, and 2019 are not documented on either source — left absent.
export const PAST_CONFERENCES = [
  { year: 2016, edition: "I", location: "Des Moines, IA" },
  { year: 2017, edition: "II", location: "Iowa City, IA", theme: "Willing to Grow" },
  { year: 2018, edition: "III", location: "Des Moines, IA" },
  { year: 2019, edition: "IV", location: "Cedar Rapids, IA" },
  { year: 2021, edition: "V", location: "Iowa City, IA", theme: "A Vision for You" },
  { year: 2022, edition: "VI", location: "Des Moines, IA", theme: "Freedom From the Bondage of Self" },
  { year: 2023, edition: "VII", location: "Quad Cities, IA", theme: "Age of Miracles" },
  { year: 2024, edition: "VIII", location: "Des Moines, IA", theme: "If You Build It, They Will Come to Believe" },
  { year: 2025, edition: "IX", location: "Cedar Rapids, IA", theme: "Match Calamity With Serenity" },
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
    title: "4th of July Picnic in the Park",
    date: "2026-07-04",
    time: "1:00–4:00 PM",
    location: "Hickory Hill North Shelter",
    city: "800 Conklin Ln, Iowa City, IA",
    description:
      "An IAYPAA X Fourth of July picnic with a speaker at 2:30. Walking tacos, hot dogs, and drinks for sale; sides and desserts provided. $5 suggested donation. Basket and 50/50 raffle. Family friendly, so bring your own chair.",
    flyer: "/flyers/july-4th-picnic.pdf",
    flyerThumb: "/flyers/july-4th-picnic.jpg",
  },
  {
    id: "yoga-meditation-in-the-park",
    title: "Meditation & Yoga in the Park",
    date: "2026-07-11",
    time: "10:00 AM–12:00 PM",
    location: "City Park, near the festival stage",
    city: "200 Park Rd, Iowa City, IA",
    description:
      "A morning of meditation and yoga in the park with Noelle Nyren. All experience levels welcome; come as you are. Bring your own mat or blanket; water bottles for sale. $10 suggested donation.",
    flyer: "/flyers/yoga-meditation-in-the-park.pdf",
    flyerThumb: "/flyers/yoga-meditation-in-the-park.jpg",
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
      "The kick-off spaghetti dinner, the last big gathering before the doors open for IAYPAA X. Eat well, then we go.",
  },
];

// Hospitality suite host sign-up. Home groups claim a meal/snack slot in the
// suite at the Graduate via SignUpGenius. Live availability lives on
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
        note: "Breakfast",
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
        note: "Breakfast",
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
      "Our conferences feature speaker meetings, panel discussions, workshops, fellowship events, and social activities, all centered around recovery. Expect a weekend of connection, growth, and fun in sobriety.",
  },
  {
    question: "How much does it cost to attend?",
    answer:
      "Registration is open. Early Bird is $25 for a full weekend pass, and that price goes up, so get in before it does. At-the-door pricing will be announced closer to the conference. Scholarships are available and no one is turned away for lack of funds. See the Registration page to reserve your seat or to ask about a scholarship, quietly.",
  },
  {
    question: "Where will IAYPAA X be held?",
    answer:
      "IAYPAA X will be held August 14–16, 2026 at Graduate by Hilton Iowa City, 210 S Dubuque St, in downtown Iowa City on the Ped Mall. Check the Hotel & Venue page for details and booking info!",
  },
  {
    question: "Is this an AA event?",
    answer:
      "Yes. IAYPAA conferences are organized in the spirit of AA's Twelve Traditions. We are self-supporting through our own contributions and do not accept outside funding. A few documents from the broader fellowship, like Bill W.'s letters and the AA General Service Office bulletins, explain where young-people's conferences sit inside A.A.",
    link: { label: "See the references on About", href: "/about#where-this-comes-from" },
  },
  {
    question: "How can I get involved?",
    answer:
      "We'd love your help! Visit our Outreach page to learn about committee positions, or reach out to us directly. Service opportunities are a great way to get involved and give back.",
  },
  {
    question: "How can I support the conference?",
    answer:
      "IAYPAA X is self-supporting through our own contributions, in the spirit of the Seventh Tradition. If you'd like to chip in, you can send a donation through Cash App to $IAYPAAX. Every dollar goes back into the weekend, keeps registration low, and helps fund the scholarships that make sure no one is turned away for lack of funds.",
    link: { label: "Support the conference", href: "/#donate" },
  },
  {
    question: "What is the Primordial Ooze theme?",
    answer:
      "Primordial Ooze is the theme of our 10th annual conference. It's where life begins: the formless place every one of us started from, and the new life that comes up out of it when you stop trying to do it alone. Ten years of IAYPAA, and a story about coming up out of the dark.",
  },
] as const;
