import { NavLinks } from "@/components/nav-links";

export function Nav() {
  return (
    <header>
      <nav
        className="relative z-10 animate-fade-up-nav border-b border-fg/[0.06] py-[clamp(1.25rem,3.5vw,1.75rem)] dark:border-fg/[0.08]"
        aria-label="Primary navigation"
      >
        <NavLinks />
      </nav>
    </header>
  );
}
