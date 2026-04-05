import type { Metadata } from "next";

import { AuthForm } from "@/components/auth-form";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sign in",
  description: `Sign in or create an account for ${SITE_NAME}.`,
  alternates: { canonical: "/auth" },
  openGraph: {
    url: "/auth",
    title: `Sign in · ${SITE_NAME}`,
    description: `Sign in or create an account for ${SITE_NAME}.`,
  },
  twitter: {
    title: `Sign in · ${SITE_NAME}`,
    description: `Sign in or create an account for ${SITE_NAME}.`,
  },
  robots: { index: false, follow: false },
};

export default function AuthPage() {
  return <AuthForm />;
}
