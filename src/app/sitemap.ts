import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site";

const paths = ["", "/about", "/words", "/kindness"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((path) => ({
    url: `${SITE_URL}${path || "/"}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
