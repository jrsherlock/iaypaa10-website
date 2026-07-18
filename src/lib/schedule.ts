// The weekend program, transcribed from the host committee's working
// timeline ("No Gram Like the Program" master sheet). Names follow the
// Eleventh Tradition: first name + last initial only, no contact details.
// Times are the committee's working grid and may shift before August.

/** Session category — drives the color coding + legend on /schedule. */
export type SessionKind = "main" | "panel" | "meeting" | "social";

export const KIND_LABELS: Record<SessionKind, string> = {
  main: "Main events",
  panel: "Panels & workshops",
  meeting: "Meetings & quiet hours",
  social: "Socials & games",
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
  /** Single lead/chair, "First L. · Place". */
  lead?: string;
  /** Panel roster, "First L. · Place" each. */
  panelists?: readonly string[];
};

export type ScheduleDay = {
  code: "FRI" | "SAT" | "SUN";
  date: string; // "Aug 14"
  name: string;
  blurb: string;
  events: readonly ScheduleEvent[];
  footnote?: string;
};

export const FEATURED_SPEAKERS: readonly { name: string; from: string }[] = [
  { name: "Dan K.", from: "Twin Cities" },
  { name: "Sammy F.", from: "Cedar Rapids, IA" },
];

/** Threads that run continuously, all weekend long. */
export const ALL_WEEKEND: readonly {
  title: string;
  detail: string;
  link?: { href: string; label: string };
}[] = [
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
      "Doors open, hugs out front, registration in the lobby. The marathon room warms up, the first panel lands late afternoon, and the night builds through the state roll call to the Friday speaker — then pajamas.",
    events: [
      {
        time: "12:00 PM",
        title: "Doors & registration open",
        room: "Lobby",
        kind: "main",
        desc: "Lanyards in the lobby. The marathon meeting room and hospitality suite open as the building fills up.",
      },
      {
        time: "4:30 PM",
        until: "6:00 PM",
        title: "LGBTQIA+ panel",
        room: "Benson Room",
        kind: "panel",
        desc: "Five voices, fifteen minutes each.",
        panelists: [
          "Mario O. · Oshkosh, WI",
          "Damon A.",
          "Nikki T. · Iowa City, IA",
          "Amrei B.",
          "Ryan S.",
        ],
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
      },
      {
        time: "9:15 PM",
        until: "10:15 PM",
        title: "“When We Retire at Night”",
        subtitle: "Shadow conference · page 86",
        room: "Hoak Room",
        kind: "meeting",
        desc: "The Big Book's nightly inventory, taken together.",
        lead: "Bill S.",
      },
      {
        time: "10:00 PM",
        title: "Pajama Palooza",
        room: "Main Ballroom",
        kind: "social",
        desc: "Pajamas on, DJ's choice, into the small hours.",
      },
    ],
  },
  {
    code: "SAT",
    date: "Aug 15",
    name: "The core day",
    blurb:
      "The fullest day: meditation at eight, bid skits, step panels running across three rooms, hot wings and cake in between — then the sobriety countdown, the Saturday speaker, and a glow dance to burn off whatever's left.",
    events: [
      {
        time: "8:00 AM",
        until: "9:00 AM",
        title: "Mindful movement & guided meditation",
        room: "Main Ballroom",
        kind: "meeting",
        desc: "Start the biggest day slow.",
      },
      {
        time: "9:15 AM",
        until: "11:15 AM",
        title: "Bid skits",
        room: "Main Ballroom",
        kind: "main",
        desc: "The bidding committees make their case for next year's conference.",
      },
      {
        time: "10:00 AM",
        until: "11:15 AM",
        title: "“A Daily Reprieve”",
        subtitle: "Steps 10 & 11 panel",
        room: "Benson Room",
        kind: "panel",
        desc: "Five panelists, twelve minutes each.",
        panelists: [
          "Kyle T. · Cedar Rapids, IA",
          "Toni M. · Indiana",
          "Meg Q. · Iowa City, IA",
          "Shane J. · Cedar Rapids, IA",
          "Beth H. · ISCYPAA",
        ],
      },
      {
        time: "11:30 AM",
        until: "12:30 PM",
        title: "Al-Anon meeting",
        room: "Main Ballroom",
        kind: "meeting",
        panelists: ["Theresa G. · Des Moines, IA", "Darla W."],
      },
      {
        time: "11:30 AM",
        until: "12:30 PM",
        title: "“Character Defects Turn Me On!”",
        subtitle: "Steps 6 & 7 panel",
        room: "Benson Room",
        kind: "panel",
        panelists: [
          "Samantha A. · Chicago",
          "Jennifer R. · Chicago",
          "Justin W. · Quad Cities",
        ],
      },
      {
        time: "11:30 AM",
        until: "12:30 PM",
        title: "“Who's Will?”",
        subtitle: "Step 3 panel",
        room: "Hoak Room",
        kind: "panel",
        panelists: [
          "Kody D. · Quad Cities",
          "JT W. · Quincy, MO",
          "Chris B. · Milwaukee, WI",
        ],
      },
      {
        time: "12:45 PM",
        until: "1:45 PM",
        title: "Traditions workshop",
        room: "Hoak Room",
        kind: "panel",
        lead: "Jennifer G. · East Moline, IL",
      },
      {
        time: "1:00 PM",
        until: "3:30 PM",
        title: "Cake decorating",
        room: "Benson Room",
        kind: "social",
        desc: "Decorate one for the cake social tonight.",
      },
      {
        time: "1:00 PM",
        until: "3:30 PM",
        title: "Bag toss",
        room: "Courtyard",
        kind: "social",
        desc: "Open boards all afternoon.",
      },
      {
        time: "2:00 PM",
        until: "4:00 PM",
        title: "Hot wing panel",
        room: "Main Ballroom",
        kind: "social",
        desc: "The questions get harder as the wings get hotter.",
        lead: "Tom H.",
        panelists: [
          "Evan E. · Chicago",
          "Charlie M. · MNYPAA",
          "Jesse G. · Chicago",
          "Shawn G. · Texas",
          "Mo M.",
        ],
      },
      {
        time: "4:00 PM",
        until: "5:00 PM",
        title: "“I'm Screwed — Is There Hope?”",
        subtitle: "Steps 1 & 2 panel",
        room: "Benson Room",
        kind: "panel",
        panelists: [
          "Tyler V. · Quad Cities",
          "Katrina N. · Cedar Rapids, IA",
          "Max H. · Iowa City, IA",
          "Jeremy M. · Cedar Rapids, IA",
        ],
      },
      {
        time: "4:00 PM",
        until: "5:00 PM",
        title: "“The Exact Nature of My Wrongs”",
        subtitle: "Steps 4 & 5 panel",
        room: "Hoak Room",
        kind: "panel",
        panelists: [
          "Grant N. · Wisconsin",
          "Isabella R. · Kansas City, MO",
          "Emily L. · Kansas City, MO",
          "Tracey S.",
        ],
      },
      {
        time: "5:15 PM",
        until: "6:15 PM",
        title: "“Cleaning Up the Dumpster Fire”",
        subtitle: "Steps 8 & 9 panel",
        room: "Benson Room",
        kind: "panel",
        panelists: ["Kurt A.", "James D. · Des Moines, IA"],
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
        title: "Saturday night main speaker",
        room: "Main Ballroom",
        kind: "main",
        lead: "Dan K. · Twin Cities",
        desc: "The emotional peak of the weekend.",
      },
      {
        time: "9:00 PM",
        title: "Where's it going?",
        subtitle: "Advisory bid decision & passing of the torch",
        room: "Main Ballroom",
        kind: "main",
        desc: "Next year's host city is announced and the banner changes hands.",
      },
      {
        time: "9:15 PM",
        until: "10:15 PM",
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
      },
      {
        time: "11:00 PM",
        title: "“When We Retire at Night”",
        subtitle: "Shadow conference · page 86, with a fun twist",
        room: "Benson Room",
        kind: "meeting",
      },
    ],
    footnote:
      "A Step 12 panel and a few room assignments are still being placed on the grid.",
  },
  {
    code: "SUN",
    date: "Aug 16",
    name: "Closing morning",
    blurb:
      "A softer landing: yoga at eight, the Sunday formalities and closing speaker at ten, then the goodbyes you keep in your pocket for the year.",
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
        until: "12:00 PM",
        title: "Sunday formalities & closing speaker",
        room: "Main Ballroom",
        kind: "main",
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
  },
];
