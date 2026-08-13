// The weekend program, transcribed from the committee's final Friday /
// Saturday / Sunday grams. Names follow the Eleventh Tradition: first name +
// last initial only, no contact details. The grams publish start times and
// rooms; end times are only given where the gram states one, so most sessions
// carry a start time alone.

/** Session category — drives the color coding + legend on /schedule. */
export type SessionKind = "main" | "panel" | "meeting" | "social";

export const KIND_LABELS: Record<SessionKind, string> = {
  main: "Main events",
  panel: "Panels & workshops",
  meeting: "Meetings & quiet hours",
  social: "Socials & games",
};

/**
 * An event poster in `public/flyers/`. Intrinsic dimensions travel with the
 * path because the posters aren't a uniform aspect ratio — they're rendered
 * uncropped, so nothing on the artwork gets cut off.
 */
export type EventPoster = {
  src: string;
  width: number;
  height: number;
};

export type ScheduleEvent = {
  /** Start time, e.g. "4:00 PM". Events sharing a start time group together. */
  time: string;
  /** Optional end time, shown as "til 5:00 PM". */
  until?: string;
  title: string;
  /** Small qualifier under the title, e.g. "Steps 1 & 2 panel". */
  subtitle?: string;
  room: string;
  kind: SessionKind;
  desc?: string;
  /**
   * A marquee name — the person the session is built around. Rendered large,
   * in gold, as the headline of the card. First name + last initial only.
   */
  speaker?: string;
  /** Single lead/chair, "First L. · Place". */
  lead?: string;
  /** Panel roster, "First L. · Place" each. */
  panelists?: readonly string[];
  /** The committee's poster for this event, pinned to the card. */
  poster?: EventPoster;
};

export type ScheduleDay = {
  code: "FRI" | "SAT" | "SUN";
  date: string; // "Aug 14"
  name: string;
  blurb: string;
  events: readonly ScheduleEvent[];
  footnote?: string;
};

export type AllWeekendItem = {
  title: string;
  detail: string;
  link?: { href: string; label: string };
};

/** Threads that run continuously, all weekend long. */
export const ALL_WEEKEND: readonly AllWeekendItem[] = [
  {
    title: "Marathon meeting room",
    detail:
      "An AA meeting running nearly around the clock, Friday afternoon through Sunday morning. Overwhelmed, restless, or up at 3 AM? The door is open.",
  },
  {
    title: "Hospitality suite",
    detail:
      "The social hub. Free coffee, snacks, energy drinks, and the kind of fellowship that runs late. Home groups host the meal and snack slots all weekend.",
    link: { href: "/hospitality", label: "Host a slot" },
  },
  {
    title: "Prayer & meditation room",
    detail: "A quiet space to decompress or keep your daily spiritual routine.",
  },
  {
    title: "Outreach tables",
    detail:
      "MNYPAA · ISCYPAA · WICYPAA · MOSCYPAA · ICYPAA · Midwest CampYPAA · TXYPAA · HACYPAA. Come meet the bids.",
  },
];

export const SCHEDULE_DAYS: readonly ScheduleDay[] = [
  {
    code: "FRI",
    date: "Aug 14",
    name: "Opening night",
    blurb:
      "Doors open at three, hugs out front, registration in the lobby. The marathon room warms up, the first panel lands late afternoon, and the night builds through the state roll call to Tonya M. — then pajamas.",
    events: [
      {
        time: "3:00 PM",
        title: "Doors & registration open",
        room: "Lobby",
        kind: "main",
        desc: "Lanyards in the lobby. The marathon meeting room and hospitality suite open as the building fills up.",
      },
      {
        time: "4:30 PM",
        title: "LGBTQIA+ panel",
        room: "Benson Room",
        kind: "panel",
        desc: "Five voices, fifteen minutes each.",
      },
      {
        time: "6:30 PM",
        title: "Hype",
        room: "Main Ballroom",
        kind: "main",
        desc: "The room gets loud before it gets quiet.",
      },
      {
        time: "7:00 PM",
        title: "Readings & state roll call",
        room: "Main Ballroom",
        kind: "main",
        desc: "Stand up when they call your state.",
      },
      {
        time: "8:00 PM",
        title: "Friday night main speaker",
        room: "Main Ballroom",
        kind: "main",
        speaker: "Tonya M.",
      },
      {
        time: "10:00 PM",
        title: "Pajama Palooza",
        room: "Main Ballroom",
        kind: "social",
        desc: "Pajamas on, DJ's choice, into the small hours. Good vibes only.",
        poster: {
          src: "/flyers/pajama-party.jpg",
          width: 1024,
          height: 1536,
        },
      },
      {
        time: "11:00 PM",
        title: "“When We Retire at Night”",
        subtitle: "Shadow conference · page 86",
        room: "Benson Room",
        kind: "meeting",
        desc: "The Big Book's nightly inventory, taken together.",
      },
    ],
  },
  {
    code: "SAT",
    date: "Aug 15",
    name: "The core day",
    blurb:
      "The fullest day: a sound bath at eight, bid skits, step panels running across three rooms, hot wings and cake in between — then the sobriety countdown, Dan K., and a glow dance to burn off whatever's left.",
    events: [
      {
        time: "8:00 AM",
        title: "Sound bath",
        room: "Main Ballroom",
        kind: "meeting",
        desc: "Start the biggest day slow.",
        lead: "Tony",
      },
      {
        time: "9:30 AM",
        title: "“Who's Will?”",
        subtitle: "Step 3 panel",
        room: "Hoak Room",
        kind: "panel",
      },
      {
        time: "9:45 AM",
        title: "Bid skits",
        room: "Main Ballroom",
        kind: "main",
        desc: "The bidding committees make their case for next year's conference.",
      },
      {
        time: "10:00 AM",
        title: "“A Daily Reprieve”",
        subtitle: "Steps 10 & 11 panel",
        room: "Benson Room",
        kind: "panel",
        desc: "Five panelists, twelve minutes each.",
      },
      {
        time: "11:30 AM",
        title: "Step 12 panel",
        room: "Hoak Room",
        kind: "panel",
      },
      {
        time: "11:30 AM",
        title: "“Character Defects Turn Me On!”",
        subtitle: "Steps 6 & 7 panel",
        room: "Benson Room",
        kind: "panel",
      },
      {
        time: "12:00 PM",
        title: "Al-Anon meeting",
        room: "Main Ballroom",
        kind: "meeting",
        speaker: "Theresa G.",
      },
      {
        time: "12:45 PM",
        title: "Traditions workshop",
        room: "Hoak Room",
        kind: "panel",
      },
      {
        time: "1:30 PM",
        title: "Bag toss",
        room: "Patio",
        kind: "social",
        desc: "Boards out on the patio.",
      },
      {
        time: "1:30 PM",
        title: "Cake decorating",
        room: "Benson Room",
        kind: "social",
        desc: "Decorate one for the cake social tonight.",
      },
      {
        time: "2:00 PM",
        title: "Hot wing panel",
        room: "Main Ballroom",
        kind: "social",
        desc: "The questions get harder as the wings get hotter.",
      },
      {
        time: "4:00 PM",
        title: "“I'm Screwed — Is There Hope?”",
        subtitle: "Steps 1 & 2 panel",
        room: "Benson Room",
        kind: "panel",
      },
      {
        time: "4:30 PM",
        title: "“The Exact Nature of My Wrongs”",
        subtitle: "Steps 4 & 5 panel",
        room: "Hoak Room",
        kind: "panel",
      },
      {
        time: "5:15 PM",
        title: "“Cleaning Up the Dumpster Fire”",
        subtitle: "Steps 8 & 9 panel",
        room: "Benson Room",
        kind: "panel",
      },
      {
        time: "6:30 PM",
        title: "Hype",
        room: "Main Ballroom",
        kind: "main",
      },
      {
        time: "7:00 PM",
        title: "Readings & sobriety countdown",
        room: "Main Ballroom",
        kind: "main",
        desc: "Longest sobriety counted down to 24 hours — the whole room stands for somebody.",
      },
      {
        time: "8:00 PM",
        title: "Where's it going?",
        subtitle: "Advisory bid decision & passing of the torch",
        room: "Main Ballroom",
        kind: "main",
        desc: "Next year's host city is announced and the banner changes hands.",
      },
      {
        time: "8:15 PM",
        title: "Saturday night main speaker",
        room: "Main Ballroom",
        kind: "main",
        speaker: "Dan K.",
        desc: "The emotional peak of the weekend.",
      },
      {
        time: "9:45 PM",
        title: "Cake social",
        room: "Hospitality Suite",
        kind: "social",
        desc: "The afternoon's cakes meet their fate.",
      },
      {
        time: "10:00 PM",
        title: "“Shake Your Ooze Thing” glow dance",
        room: "Main Ballroom",
        kind: "social",
        desc: "Glow sticks, EDM, trap, and the filthiest house the DJ can offer.",
        poster: {
          src: "/flyers/shake-your-ooze-thing.jpg",
          width: 1086,
          height: 1448,
        },
      },
      {
        time: "10:00 PM",
        title: "Karaoke",
        room: "Hoak Room",
        kind: "social",
        desc: "For everyone whose night needs a microphone.",
      },
      {
        time: "11:00 PM",
        title: "“When We Retire at Night”",
        subtitle: "Shadow conference · page 86, with a fun twist",
        room: "Benson Room",
        kind: "meeting",
      },
    ],
  },
  {
    code: "SUN",
    date: "Aug 16",
    name: "Closing morning",
    blurb:
      "A softer landing: yoga at eight, the Sunday formalities and Sammy F. at ten, then the goodbyes you keep in your pocket for the year.",
    events: [
      {
        time: "8:00 AM",
        until: "9:00 AM",
        title: "Yoga",
        room: "Main Ballroom",
        kind: "meeting",
        desc: "Stretch it out before the drive home.",
      },
      {
        time: "10:00 AM",
        title: "Formalities & closing speaker",
        room: "Main Ballroom",
        kind: "main",
        speaker: "Sammy F.",
        desc: "A final, reflective meeting to ground the weekend.",
      },
      {
        time: "12:00 PM",
        title: "Farewell — safe travels home",
        room: "Lobby",
        kind: "main",
        desc: "See you next year.",
      },
    ],
    footnote: "Thank you all so much for coming.",
  },
];
