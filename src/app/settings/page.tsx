import type { Metadata } from "next";

import { SITE_NAME } from "@/lib/site";

import { SettingsClient } from "./settings-client";

export const metadata: Metadata = {
  title: "Settings",
  description: `Account settings for ${SITE_NAME} (coming soon).`,
  alternates: { canonical: "/settings" },
  robots: { index: false, follow: false },
  openGraph: {
    url: "/settings",
    title: `Settings · ${SITE_NAME}`,
    description: `Account settings for ${SITE_NAME} (coming soon).`,
  },
  twitter: {
    title: `Settings · ${SITE_NAME}`,
    description: `Account settings for ${SITE_NAME} (coming soon).`,
  },
};

export default function SettingsPage() {
  return <SettingsClient />;
}
