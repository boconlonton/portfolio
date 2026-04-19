"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  LogOut,
  Menu,
  PlusCircle,
  Settings,
  UserRound,
} from "lucide-react";
import { useEffect, useLayoutEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
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
import {
  AUTH_STORAGE_CHANGED_EVENT,
  getStoredAuthEmail,
  signOut,
} from "@/lib/auth-storage";
import { cn } from "@/lib/utils";

const linkClass =
  "whitespace-nowrap rounded-sm text-[0.8125rem] font-normal leading-none tracking-[-0.01em] text-subtle no-underline transition-colors duration-200 hover:text-fg hover:no-underline focus-visible:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] focus-visible:no-underline";

const mobileLinkClass = cn(
  linkClass,
  "block whitespace-normal py-3 text-[0.9375rem] leading-snug",
);

const primaryLinks = [
  { href: "/play/", label: "Play" },
] as const;

const accountLinks = [
  { href: "/settings/", label: "Settings", Icon: Settings },
  { href: "/quotes/add/", label: "Add quotes", Icon: PlusCircle },
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
    window.addEventListener(AUTH_STORAGE_CHANGED_EVENT, sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener(AUTH_STORAGE_CHANGED_EVENT, sync);
    };
  }, [pathname]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const authIsCurrent = pathIs(pathname, "/auth");

  const signInClass = cn(
    "link-real",
    linkClass,
    authIsCurrent && "font-medium text-fg",
  );

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
        <div
          className="hidden items-center gap-2 border-l border-border/70 pl-3 dark:border-border/50 md:flex"
          role="group"
          aria-label="Account and site appearance"
        >
          {authEmail ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  className="h-9 max-w-[min(15rem,32vw)] cursor-pointer gap-2 rounded-full border border-border/80 bg-muted/45 px-3 font-normal text-[0.8125rem] leading-none tracking-[-0.01em] text-fg transition-colors duration-200 hover:bg-muted/65 dark:bg-muted/35 dark:hover:bg-muted/50"
                  aria-label={`Open account menu for ${authEmail}`}
                  aria-haspopup="menu"
                >
                  <UserRound
                    className="size-3.5 shrink-0 text-primary opacity-90"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                  <span className="min-w-0 flex-1 truncate text-left font-medium">
                    {authEmail}
                  </span>
                  <ChevronDown
                    className="size-4 shrink-0 opacity-55"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                sideOffset={8}
                className="min-w-[12.5rem] overflow-hidden rounded-xl border-border/80 bg-popover p-1.5 shadow-lg dark:border-border/55"
              >
                <div className="mb-1 border-b border-border/70 px-2 pb-2 pt-0.5 dark:border-border/50">
                  <p className="font-heading text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-subtle">
                    Account
                  </p>
                  <p
                    className="mt-1 truncate font-body text-[0.8125rem] font-medium text-fg"
                    title={authEmail}
                  >
                    {authEmail}
                  </p>
                </div>
                {accountLinks.map(({ href, label, Icon }) => (
                  <DropdownMenuItem key={href} asChild>
                    <Link
                      href={href}
                      className="link-real flex cursor-pointer items-center gap-2 rounded-md no-underline focus:no-underline"
                    >
                      <Icon
                        className="size-4 shrink-0 opacity-70"
                        strokeWidth={1.75}
                        aria-hidden
                      />
                      {label}
                    </Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator className="my-1 bg-border/80 dark:bg-border/60" />
                <DropdownMenuItem
                  className="cursor-pointer gap-2 rounded-md text-destructive focus:bg-destructive/10 focus:text-destructive"
                  onSelect={(e) => {
                    e.preventDefault();
                    signOut();
                  }}
                >
                  <LogOut
                    className="size-4 shrink-0 opacity-80"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              href="/auth/"
              className={signInClass}
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
                <div aria-labelledby="mobile-nav-site-heading">
                  <p
                    id="mobile-nav-site-heading"
                    className="mb-1 font-heading text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-subtle"
                  >
                    Site
                  </p>
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
                </div>
                <div
                  className="mt-6 border-t border-border/80 pt-4 dark:border-border/60"
                  role="region"
                  aria-labelledby="mobile-nav-account-heading"
                >
                  <p
                    id="mobile-nav-account-heading"
                    className="mb-2 font-heading text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-subtle"
                  >
                    Account
                  </p>
                  {authEmail ? (
                    <>
                      <p
                        className="mb-3 flex items-center gap-2 rounded-lg border border-border/60 bg-muted/35 px-2.5 py-2 text-[0.75rem] leading-snug text-subtle dark:bg-muted/25"
                        title={authEmail}
                      >
                        <UserRound
                          className="size-4 shrink-0 text-primary opacity-90"
                          strokeWidth={1.75}
                          aria-hidden
                        />
                        <span className="min-w-0 break-all font-medium text-fg">
                          {authEmail}
                        </span>
                      </p>
                      {accountLinks.map(({ href, label, Icon }) => (
                        <Link
                          key={href}
                          href={href}
                          className={cn(
                            mobileLinkClass,
                            "flex items-center gap-2",
                          )}
                          aria-current={
                            pathIs(pathname, href) ? "page" : undefined
                          }
                          onClick={() => setMobileOpen(false)}
                        >
                          <Icon
                            className="size-4 shrink-0 opacity-65"
                            strokeWidth={1.75}
                            aria-hidden
                          />
                          {label}
                        </Link>
                      ))}
                      <button
                        type="button"
                        className={cn(
                          mobileLinkClass,
                          "mt-1 flex w-full items-center gap-2 border-t border-border/80 pt-3 text-left text-destructive dark:border-border/60",
                        )}
                        onClick={() => {
                          setMobileOpen(false);
                          signOut();
                        }}
                      >
                        <LogOut
                          className="size-4 shrink-0 opacity-80"
                          strokeWidth={1.75}
                          aria-hidden
                        />
                        Sign out
                      </button>
                    </>
                  ) : (
                    <Link
                      href="/auth/"
                      className={cn(
                        "link-real",
                        mobileLinkClass,
                        authIsCurrent && "font-medium text-fg",
                      )}
                      aria-current={authIsCurrent ? "page" : undefined}
                      onClick={() => setMobileOpen(false)}
                    >
                      Sign in
                    </Link>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
