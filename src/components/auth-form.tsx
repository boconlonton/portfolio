"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { initiateGoogleSignIn, signIn, signUp } from "@/lib/cognito";
import { setTokens } from "@/lib/auth-storage";
import { cn } from "@/lib/utils";

const linkRealClass =
  "link-real relative cursor-pointer rounded-sm font-medium text-fg no-underline transition-opacity duration-200 hover:opacity-80 hover:no-underline focus-visible:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]";

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

function cognitoMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  if (
    typeof err === "object" &&
    err !== null &&
    "message" in err &&
    typeof (err as { message: unknown }).message === "string"
  ) {
    return (err as { message: string }).message;
  }
  return "Something went wrong.";
}

export function AuthForm() {
  const router = useRouter();
  const [tab, setTab] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  async function handleGoogleSignIn() {
    setGoogleLoading(true);
    setError(null);
    try {
      await initiateGoogleSignIn();
    } catch (err: unknown) {
      setError(cognitoMessage(err));
      setGoogleLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (tab === "register" && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      if (tab === "login") {
        const tokens = await signIn(email, password);
        setTokens(tokens);
        router.push("/");
      } else {
        await signUp(email, password);
        setSuccess("Check your email to verify your address.");
        setTab("login");
        setPassword("");
        setConfirmPassword("");
      }
    } catch (err: unknown) {
      setError(cognitoMessage(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="mx-auto w-full min-w-0 max-w-md flex-1 py-12 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] sm:py-16"
    >
      <h1 className="mb-6 font-heading text-lg font-medium tracking-tight text-fg">
        Account
      </h1>

      <div
        role="tablist"
        aria-label="Authentication mode"
        className="mb-8 flex border-b border-[var(--ds-control-track-border)]"
      >
        <button
          type="button"
          role="tab"
          aria-selected={tab === "login"}
          className={cn(
            "mr-6 pb-2 text-sm font-medium transition-colors duration-200",
            tab === "login"
              ? "border-b-2 border-[var(--ds-accent)] text-fg"
              : "border-b-2 border-transparent text-[var(--text-muted)] hover:text-fg",
          )}
          onClick={() => {
            setTab("login");
            setError(null);
            setSuccess(null);
          }}
        >
          Sign in
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === "register"}
          className={cn(
            "pb-2 text-sm font-medium transition-colors duration-200",
            tab === "register"
              ? "border-b-2 border-[var(--ds-accent)] text-fg"
              : "border-b-2 border-transparent text-[var(--text-muted)] hover:text-fg",
          )}
          onClick={() => {
            setTab("register");
            setError(null);
            setSuccess(null);
          }}
        >
          Create account
        </button>
      </div>

      {error && (
        <p
          role="alert"
          aria-live="assertive"
          className="mb-4 text-sm text-destructive"
        >
          {error}
        </p>
      )}
      {success && (
        <p
          role="status"
          aria-live="polite"
          className="mb-4 text-sm text-[var(--ds-accent)]"
        >
          {success}
        </p>
      )}

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="auth-email" className="text-sm font-medium text-fg">
            Email
          </label>
          <Input
            id="auth-email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            disabled={loading || googleLoading}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="auth-password" className="text-sm font-medium text-fg">
            Password
          </label>
          <Input
            id="auth-password"
            type="password"
            autoComplete={
              tab === "login" ? "current-password" : "new-password"
            }
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading || googleLoading}
          />
        </div>
        {tab === "register" && (
          <div className="flex flex-col gap-1.5">
            <label htmlFor="auth-confirm" className="text-sm font-medium text-fg">
              Confirm password
            </label>
            <Input
              id="auth-confirm"
              type="password"
              autoComplete="new-password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={loading || googleLoading}
            />
          </div>
        )}
        <Button
          type="submit"
          className="w-full"
          disabled={loading || googleLoading}
        >
          {loading
            ? tab === "login"
              ? "Signing in…"
              : "Creating account…"
            : tab === "login"
              ? "Sign in"
              : "Create account"}
        </Button>
      </form>

      <div className="relative my-8 flex items-center gap-3">
        <div className="h-px flex-1 bg-[var(--ds-control-track-border)]" />
        <span className="text-[0.75rem] text-[var(--text-muted)]">or</span>
        <div className="h-px flex-1 bg-[var(--ds-control-track-border)]" />
      </div>

      <Button
        type="button"
        variant="outline"
        className="w-full gap-2"
        disabled={loading || googleLoading}
        onClick={handleGoogleSignIn}
      >
        <GoogleIcon />
        {googleLoading ? "Redirecting…" : "Sign in with Google"}
      </Button>

      <p className="mt-8 text-sm text-[var(--text-muted)]">
        <Link href="/" className={linkRealClass}>
          ← Home
        </Link>
      </p>
    </main>
  );
}
