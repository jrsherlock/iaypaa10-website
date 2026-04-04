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
  { label: "Hotel & Venue", href: "/hotel" },
  { label: "Speakers", href: "/speakers" },
  { label: "Merch", href: "/merch" },
  { label: "Past Conferences", href: "/past-conferences" },
  { label: "Outreach", href: "/outreach" },
  { label: "FAQ", href: "/faq" },
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
      "Primordial Ooze is our B-movie horror theme for the 10th annual conference! Think classic monster movies, dripping slime, and retro horror vibes — a unique and memorable celebration of a decade of IAYPAA.",
  },
] as const;
