import type { Metadata } from "next";
import Link from "next/link";

import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `About ${SITE_NAME} — background and work (page coming soon).`,
  alternates: { canonical: "/about" },
  openGraph: {
    url: "/about",
    title: `About · ${SITE_NAME}`,
    description: `About ${SITE_NAME} — background and work (page coming soon).`,
  },
  twitter: {
    title: `About · ${SITE_NAME}`,
    description: `About ${SITE_NAME} — background and work (page coming soon).`,
  },
};

export default function AboutPage() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="flex-1 py-16 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
    >
      <h1 className="mb-4 font-heading text-lg font-medium tracking-tight text-fg">
        About
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
