import type { MetadataRoute } from "next";

import {
  SITE_DESCRIPTION,
  SITE_FAVICON_HREF,
  SITE_NAME,
} from "@/lib/site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: "limitisthesky",
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    lang: "en",
    icons: [
      {
        src: SITE_FAVICON_HREF,
        type: "image/svg+xml",
        sizes: "any",
        purpose: "any",
      },
    ],
  };
}
