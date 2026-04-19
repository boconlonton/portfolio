import type { Metadata } from "next";

import { PlayClient } from "./play-client";

export const metadata: Metadata = {
  title: "Play",
  description: "A party game for real conversation — Truth, Dare, Would You Rather, and Stoic Path modes with configurable levels and penalties.",
  robots: { index: false, follow: false },
};

export default function PlayPage() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="flex flex-1 flex-col focus:outline-none"
    >
      <PlayClient />
    </main>
  );
}
