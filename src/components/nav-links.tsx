"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu } from "lucide-react";
import { useEffect, useLayoutEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import { getStoredAuthEmail } from "@/lib/auth-storage";
import { cn } from "@/lib/utils";

const linkClass =
  "whitespace-nowrap rounded-sm text-[0.8125rem] font-normal leading-none tracking-[-0.01em] text-subtle no-underline transition-colors duration-200 hover:text-fg hover:no-underline focus-visible:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] focus-visible:no-underline";

const mobileLinkClass = cn(
  linkClass,
  "block whitespace-normal py-3 text-[0.9375rem] leading-snug",
);

const primaryLinks = [
  { href: "/about/", label: "About me" },
  { href: "/words/", label: "Thoughts" },
] as const;

const accountLinks = [
  { href: "/settings/", label: "Settings" },
  { href: "/quotes/add/", label: "Add quotes" },
] as const;

function pathIs(pathname: string, path: string) {
  const a = pathname.replace(/\/$/, "") || "/";
  const b = path.replace(/\/$/, "") || "/";
  return a === b;
}

export function NavLinks() {
  const pathname = usePathname();
  const isHome = pathIs(pathname, "/");
  const [authEmail, setAuthEmail] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useLayoutEffect(() => {
    function sync() {
      setAuthEmail(getStoredAuthEmail());
    }
    sync();
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, [pathname]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const authIsCurrent = pathIs(pathname, "/auth");

  return (
    <div className="flex w-full min-w-0 flex-nowrap items-center justify-between gap-x-3 sm:gap-x-4">
      <div className="flex min-w-0 flex-1 items-center gap-x-[clamp(1rem,3vw,2.25rem)] md:gap-x-[clamp(1.25rem,3vw,2.5rem)]">
        <Link
          href="/"
          className="nav-brand shrink-0 font-body text-[0.8125rem] font-medium leading-none tracking-[-0.02em] text-fg no-underline"
          aria-label="limitisthesky home"
          aria-current={isHome ? "page" : undefined}
        >
          limitisthesky
        </Link>

        <ul
          className="m-0 hidden list-none flex-row flex-nowrap items-center gap-x-[clamp(1rem,2.5vw,1.5rem)] md:flex"
          role="list"
        >
          {primaryLinks.map(({ href, label }) => (
            <li key={href} className="shrink-0">
              <Link
                href={href}
                className={linkClass}
                aria-current={pathIs(pathname, href) ? "page" : undefined}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex shrink-0 items-center gap-2 md:gap-x-[clamp(0.5rem,2vw,1rem)]">
        <div className="hidden items-center gap-x-2 md:flex">
          {authEmail ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  className="h-9 max-w-[min(16rem,30vw)] cursor-pointer gap-1 px-2 font-normal text-[0.8125rem] leading-none tracking-[-0.01em] text-subtle hover:text-fg"
                  aria-label={`Account menu for ${authEmail}`}
                >
                  <span className="truncate">
                    Hello, {authEmail}
                  </span>
                  <ChevronDown
                    className="size-4 shrink-0 opacity-60"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[10.5rem]">
                {accountLinks.map(({ href, label }) => (
                  <DropdownMenuItem key={href} asChild>
                    <Link
                      href={href}
                      className="cursor-pointer no-underline focus:no-underline"
                    >
                      {label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              href="/auth/"
              className={linkClass}
              aria-current={authIsCurrent ? "page" : undefined}
            >
              Sign in
            </Link>
          )}
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="cursor-pointer shrink-0 text-fg"
                aria-label="Open menu"
                aria-expanded={mobileOpen}
                aria-controls="site-mobile-nav"
              >
                <Menu className="size-5" strokeWidth={1.75} aria-hidden />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              id="site-mobile-nav"
              className="flex w-[min(100vw,20rem)] flex-col border-l border-border bg-background p-6"
            >
              <SheetHeader className="space-y-0 text-left">
                <SheetTitle className="sr-only">Site navigation</SheetTitle>
                <SheetDescription className="sr-only">
                  Site sections and account access
                </SheetDescription>
              </SheetHeader>
              <nav
                className="flex flex-col gap-0 pt-4"
                aria-label="Mobile navigation"
              >
                {primaryLinks.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className={mobileLinkClass}
                    aria-current={pathIs(pathname, href) ? "page" : undefined}
                    onClick={() => setMobileOpen(false)}
                  >
                    {label}
                  </Link>
                ))}
                {authEmail ? (
                  <>
                    <p
                      className="border-b border-border py-2 text-[0.75rem] leading-snug tracking-[-0.01em] text-subtle"
                      title={authEmail}
                    >
                      Hello,{" "}
                      <span className="break-all font-medium text-fg/80">
                        {authEmail}
                      </span>
                    </p>
                    {accountLinks.map(({ href, label }) => (
                      <Link
                        key={href}
                        href={href}
                        className={mobileLinkClass}
                        aria-current={
                          pathIs(pathname, href) ? "page" : undefined
                        }
                        onClick={() => setMobileOpen(false)}
                      >
                        {label}
                      </Link>
                    ))}
                  </>
                ) : (
                  <Link
                    href="/auth/"
                    className={mobileLinkClass}
                    aria-current={authIsCurrent ? "page" : undefined}
                    onClick={() => setMobileOpen(false)}
                  >
                    Sign in
                  </Link>
                )}
              </nav>
            </SheetContent>
          </Sheet>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
