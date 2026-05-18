import type { MetadataRoute } from "next";
import { CONFERENCE } from "@/lib/constants";

// Public, indexable routes. Keep in sync with src/app/*/page.tsx.
const ROUTES = [
  "",
  "/registration",
  "/schedule",
  "/speakers",
  "/hotel",
  "/about",
  "/faq",
  "/past-conferences",
  "/outreach",
  "/pre-conference",
  "/merch",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map((path) => ({
    url: `${CONFERENCE.siteUrl}${path}`,
    lastModified,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));
}
