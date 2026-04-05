"use client";

import Link from "next/link";

import { RequireSignedIn } from "@/components/require-signed-in";

const linkClass =
  "link-real relative cursor-pointer rounded-sm font-medium text-fg no-underline transition-opacity duration-200 hover:opacity-80 hover:no-underline focus-visible:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]";

export function SettingsClient() {
  return (
    <RequireSignedIn>
      <main
        id="main-content"
        tabIndex={-1}
        className="flex-1 py-16 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
      >
        <h1 className="mb-4 font-heading text-lg font-medium tracking-tight text-fg">
          Settings
        </h1>
        <p className="text-[var(--text-muted)]">
          Coming soon.{" "}
          <Link href="/" className={linkClass}>
            Home
          </Link>
        </p>
      </main>
    </RequireSignedIn>
  );
}
