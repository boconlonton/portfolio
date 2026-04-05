"use client";

import { notFound } from "next/navigation";
import { useLayoutEffect, useState, type ReactNode } from "react";

import { AUTH_STORAGE_CHANGED_EVENT, getTokens } from "@/lib/auth-storage";

/**
 * Client-only auth gate for static export. Children must live in the same client
 * bundle (not Server Component children) so protected markup is not pre-rendered into HTML.
 */
export function RequireSignedIn({ children }: { children: ReactNode }) {
  const [allowed, setAllowed] = useState<boolean | null>(null);

  useLayoutEffect(() => {
    function sync() {
      setAllowed(getTokens() !== null);
    }
    sync();
    window.addEventListener("storage", sync);
    window.addEventListener(AUTH_STORAGE_CHANGED_EVENT, sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener(AUTH_STORAGE_CHANGED_EVENT, sync);
    };
  }, []);

  if (allowed === null) return null;
  if (!allowed) notFound();
  return <>{children}</>;
}
