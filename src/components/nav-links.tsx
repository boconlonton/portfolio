"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ThemeToggle } from "@/components/theme-toggle";

const linkClass =
  "rounded-sm text-[0.8125rem] font-normal tracking-[-0.01em] text-subtle no-underline transition-colors duration-200 hover:text-fg hover:no-underline focus-visible:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] focus-visible:no-underline";

export function NavLinks() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <div className="flex w-full flex-wrap items-center justify-between gap-x-4 gap-y-2">
      <Link
        href="/"
        className="nav-brand font-body text-[0.8125rem] font-medium tracking-[-0.02em] text-fg no-underline hover:cursor-default hover:opacity-60"
        aria-label="limitisthesky home"
        aria-current={isHome ? "page" : undefined}
      >
        limitisthesky
      </Link>
      <div className="flex flex-wrap items-center justify-end gap-x-[clamp(1rem,3vw,1.75rem)] gap-y-2">
        <ul
          className="flex list-none gap-x-[clamp(1.25rem,3.5vw,2rem)] gap-y-2"
          role="list"
        >
          <li>
            <Link
              href="/about"
              className={linkClass}
              aria-current={pathname === "/about" ? "page" : undefined}
            >
              About me
            </Link>
          </li>
          <li>
            <Link
              href="/words"
              className={linkClass}
              aria-current={pathname === "/words" ? "page" : undefined}
            >
              Thoughts
            </Link>
          </li>
          <li>
            <Link
              href="/kindness"
              className={linkClass}
              aria-current={pathname === "/kindness" ? "page" : undefined}
            >
              Kindness
            </Link>
          </li>
        </ul>
        <ThemeToggle />
      </div>
    </div>
  );
}
