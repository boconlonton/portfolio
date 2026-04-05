"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { handleOAuthCallback } from "@/lib/cognito";
import { setTokens } from "@/lib/auth-storage";

const mainClass =
  "flex-1 py-16 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]";

const OAUTH_CODE_LOCK = "cognito_oauth_code_lock";

export function AuthCallbackClient({
  linkRealClass,
}: {
  linkRealClass: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const code = searchParams.get("code");
    const errParam = searchParams.get("error");

    if (errParam) {
      setError(
        searchParams.get("error_description") ??
          "Google sign-in was cancelled.",
      );
      return;
    }

    if (!code) {
      setError("No authorization code received.");
      return;
    }

    // One auth code = one exchange (also avoids duplicate Strict Mode / remount calls).
    try {
      if (sessionStorage.getItem(OAUTH_CODE_LOCK) === code) return;
      sessionStorage.setItem(OAUTH_CODE_LOCK, code);
    } catch {
      /* sessionStorage blocked */
    }

    handleOAuthCallback(code)
      .then((tokens) => {
        setTokens(tokens);
        try {
          sessionStorage.removeItem(OAUTH_CODE_LOCK);
        } catch {
          /* ignore */
        }
        router.replace("/");
      })
      .catch((err: unknown) => {
        try {
          sessionStorage.removeItem(OAUTH_CODE_LOCK);
        } catch {
          /* ignore */
        }
        setError(err instanceof Error ? err.message : "Sign-in failed.");
      });
  }, [searchParams, router]);

  if (error) {
    return (
      <main id="main-content" tabIndex={-1} className={mainClass}>
        <h1 className="mb-4 font-heading text-lg font-medium tracking-tight text-fg">
          Sign in failed
        </h1>
        <p className="mb-4 text-sm text-destructive">{error}</p>
        <Link href="/auth" className={linkRealClass}>
          Try again
        </Link>
      </main>
    );
  }

  return (
    <main id="main-content" tabIndex={-1} className={mainClass}>
      <p className="text-sm text-[var(--text-muted)]">Signing you in…</p>
    </main>
  );
}
