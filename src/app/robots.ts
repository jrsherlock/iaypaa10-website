import type { MetadataRoute } from "next";
import { CONFERENCE } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: `${CONFERENCE.siteUrl}/sitemap.xml`,
    host: CONFERENCE.siteUrl,
  };
}
