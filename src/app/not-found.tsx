import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="flex flex-1 flex-col justify-center py-24 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
    >
      <h1 className="font-heading text-xl font-medium tracking-tight text-fg">
        Page not found
      </h1>
      <p className="mt-3 max-w-prose text-[var(--text-muted)]">
        That URL does not exist or has moved.{" "}
        <Link
          href="/"
          className="link-real relative cursor-pointer rounded-sm font-medium text-fg no-underline transition-opacity duration-200 hover:opacity-80 hover:no-underline focus-visible:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
        >
          Go home
        </Link>
        .
      </p>
    </main>
  );
}
