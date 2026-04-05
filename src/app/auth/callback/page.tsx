import type { Metadata } from "next";
import { Suspense } from "react";

import { SITE_NAME } from "@/lib/site";

import { AuthCallbackClient } from "./auth-callback-client";

export const metadata: Metadata = {
  title: "Signing in",
  description: `Completing sign-in for ${SITE_NAME}.`,
  robots: { index: false, follow: false },
};

const linkRealClass =
  "link-real relative cursor-pointer rounded-sm font-medium text-fg no-underline transition-opacity duration-200 hover:opacity-80 hover:no-underline focus-visible:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]";

function CallbackFallback() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="flex-1 py-16 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
    >
      <p className="text-sm text-[var(--text-muted)]">Signing you in…</p>
    </main>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={<CallbackFallback />}>
      <AuthCallbackClient linkRealClass={linkRealClass} />
    </Suspense>
  );
}
