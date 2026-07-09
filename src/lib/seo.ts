// Structured-data (schema.org / JSON-LD) builders. All facts are sourced from
// constants.ts so they stay in sync with the rest of the site. Rendered via
// <JsonLd> in the home page (Event) and the /faq layout (FAQPage).
import { CONFERENCE, FAQ_ITEMS } from "@/lib/constants";

const url = (path = ""): string => `${CONFERENCE.siteUrl}${path}`;

/** schema.org/Event — makes the conference eligible for event rich results. */
export function eventJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: `${CONFERENCE.name}: ${CONFERENCE.tagline}`,
    description: `The ${CONFERENCE.edition} ${CONFERENCE.fullName} conference. ${CONFERENCE.date} in ${CONFERENCE.location}.`,
    startDate: "2026-08-14",
    endDate: "2026-08-16",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    image: [url("/images/primordial-ooze-poster.jpg")],
    url: url("/"),
    location: {
      "@type": "Place",
      name: CONFERENCE.venue.name,
      address: {
        "@type": "PostalAddress",
        streetAddress: "210 S Dubuque St",
        addressLocality: "Iowa City",
        addressRegion: "IA",
        postalCode: "52240",
        addressCountry: "US",
      },
    },
    organizer: {
      "@type": "Organization",
      name: CONFERENCE.fullName,
      url: url("/"),
    },
    offers: {
      "@type": "Offer",
      name: "Early Bird",
      category: "Early Bird",
      price: "25",
      priceCurrency: "USD",
      url: url("/registration"),
      availability: "https://schema.org/InStock",
    },
  };
}

/** schema.org/FAQPage — built from the same FAQ_ITEMS shown on /faq. */
export function faqJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
