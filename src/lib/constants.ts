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
  website: "https://iaypaa.org",
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Registration", href: "/registration" },
  { label: "Schedule", href: "/schedule" },
  { label: "Pre-Conference Events", href: "/pre-conference" },
  { label: "Hotel & Venue", href: "/hotel" },
  { label: "Speakers", href: "/speakers" },
  { label: "Merch", href: "/merch" },
  { label: "Past Conferences", href: "/past-conferences" },
  { label: "Outreach", href: "/outreach" },
  { label: "FAQ", href: "/faq" },
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
  { label: "Registration", href: "/registration" },
  {
    label: "Event",
    children: [
      { label: "Schedule", href: "/schedule" },
      { label: "Pre-Conference Events", href: "/pre-conference" },
      { label: "Speakers", href: "/speakers" },
      { label: "Hotel & Venue", href: "/hotel" },
    ],
  },
  {
    label: "Info",
    children: [
      { label: "About", href: "/about" },
      { label: "FAQ", href: "/faq" },
      { label: "Past Conferences", href: "/past-conferences" },
      { label: "Outreach", href: "/outreach" },
    ],
  },
  { label: "Merch", href: "/merch" },
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
  /** Optional link — details/RSVP for upcoming, recap/photos for past. */
  link?: string;
  linkLabel?: string;
};

// Lead-up events in the months before the Aug 14–16, 2026 conference.
// Past events stay here as an archive (rendered greyed out, still
// accessible); upcoming events show in full colour. Sample data — edit
// freely; the page sorts and splits automatically by date.
export const PRE_CONFERENCE_EVENTS: readonly PreConferenceEvent[] = [
  {
    id: "winter-bowling-fundraiser",
    title: "Winter Bowling Fundraiser",
    date: "2026-02-21",
    time: "7:00 PM",
    location: "Colonial Lanes",
    city: "Iowa City, IA",
    description:
      "A night of bowling, raffle prizes, and fellowship to open the IAYPAA X fundraising season.",
    link: "#",
    linkLabel: "See recap",
  },
  {
    id: "spring-speaker-jam",
    title: "Spring Speaker Jam",
    date: "2026-04-18",
    time: "6:30 PM",
    location: "First Presbyterian Church",
    city: "Cedar Rapids, IA",
    description:
      "An evening speaker meeting with food, fellowship, and an update from the host committee.",
    link: "#",
    linkLabel: "See recap",
  },
  {
    id: "outreach-car-wash",
    title: "Outreach Car Wash & Cookout",
    date: "2026-05-30",
    time: "11:00 AM",
    location: "Mercer Park",
    city: "Iowa City, IA",
    description:
      "Bring the car, stay for the cookout. All proceeds go toward scholarships for IAYPAA X.",
    link: "#",
    linkLabel: "Details",
  },
  {
    id: "summer-kickoff-bbq",
    title: "Summer Kickoff BBQ & Speaker",
    date: "2026-06-27",
    time: "5:00 PM",
    location: "Greenwood Pavilion",
    city: "Des Moines, IA",
    description:
      "The last big push before August — a cookout, a powerhouse speaker, and a lot of hugs.",
    link: "#",
    linkLabel: "Details",
  },
  {
    id: "final-fellowship-night",
    title: "Final Fellowship Night",
    date: "2026-07-25",
    time: "7:00 PM",
    location: "The Highlander Hotel",
    city: "Iowa City, IA",
    description:
      "One more meeting at the venue itself before the doors open for IAYPAA X.",
    link: "/registration",
    linkLabel: "Register for IAYPAA X",
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
      "Registration pricing will be announced soon. We typically offer Early Bird, Standard, and At-the-Door pricing tiers. Scholarships are available — no one is turned away for lack of funds.",
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
