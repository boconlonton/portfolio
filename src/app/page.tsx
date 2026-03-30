import type { Metadata } from "next";

import { ChatWidget } from "@/components/chat-widget";
import { Hero } from "@/components/hero";
import { Intro } from "@/components/intro";
import { SiteFooter } from "@/components/site-footer";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    url: "/",
    title: `${SITE_NAME} — developer, designer, builder`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    title: `${SITE_NAME} — developer, designer, builder`,
    description: SITE_DESCRIPTION,
  },
};

export default function Home() {
  return (
    <>
      <main
        id="main-content"
        tabIndex={-1}
        className="flex flex-1 flex-col justify-center pb-[clamp(3.5rem,9vw,6rem)] pt-[clamp(3rem,10vw,6.5rem)] focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
      >
        <Hero />
        <Intro />
      </main>
      <SiteFooter />
      <ChatWidget />
    </>
  );
}
