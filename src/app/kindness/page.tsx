import type { Metadata } from "next";
import Link from "next/link";

import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kindness",
  description: `Kindness and community notes from ${SITE_NAME} (coming soon).`,
  alternates: { canonical: "/kindness" },
  openGraph: {
    url: "/kindness",
    title: `Kindness · ${SITE_NAME}`,
    description: `Kindness and community notes from ${SITE_NAME} (coming soon).`,
  },
  twitter: {
    title: `Kindness · ${SITE_NAME}`,
    description: `Kindness and community notes from ${SITE_NAME} (coming soon).`,
  },
};

export default function KindnessPage() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="flex-1 py-16 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
    >
      <h1 className="mb-4 font-heading text-lg font-medium tracking-tight text-fg">
        Kindness
      </h1>
      <p className="text-[var(--text-muted)]">
        Coming soon.{" "}
        <Link
          href="/"
          className="link-real relative cursor-pointer rounded-sm font-medium text-fg no-underline transition-opacity duration-200 hover:opacity-80 hover:no-underline focus-visible:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
        >
          Home
        </Link>
      </p>
    </main>
  );
}
