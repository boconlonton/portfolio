import type { Metadata } from "next";

import { SITE_NAME } from "@/lib/site";

import { AddQuotesClient } from "./add-quotes-client";

export const metadata: Metadata = {
  title: "Add quotes",
  description: `Add quotes — ${SITE_NAME} (coming soon).`,
  alternates: { canonical: "/quotes/add" },
  robots: { index: false, follow: false },
  openGraph: {
    url: "/quotes/add",
    title: `Add quotes · ${SITE_NAME}`,
    description: `Add quotes — ${SITE_NAME} (coming soon).`,
  },
  twitter: {
    title: `Add quotes · ${SITE_NAME}`,
    description: `Add quotes — ${SITE_NAME} (coming soon).`,
  },
};

export default function AddQuotesPage() {
  return <AddQuotesClient />;
}
