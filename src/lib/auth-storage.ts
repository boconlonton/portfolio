export const AUTH_ACCESS_TOKEN_KEY = "auth_access_token";
export const AUTH_ID_TOKEN_KEY = "auth_id_token";
export const AUTH_REFRESH_TOKEN_KEY = "auth_refresh_token";

const PKCE_VERIFIER_KEY = "pkce_code_verifier";

export function setTokens(tokens: {
  accessToken: string;
  idToken: string;
  refreshToken: string;
}): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(AUTH_ACCESS_TOKEN_KEY, tokens.accessToken);
  localStorage.setItem(AUTH_ID_TOKEN_KEY, tokens.idToken);
  localStorage.setItem(AUTH_REFRESH_TOKEN_KEY, tokens.refreshToken);
}

export function getTokens(): {
  accessToken: string;
  idToken: string;
  refreshToken: string;
} | null {
  if (typeof window === "undefined") return null;
  const accessToken = localStorage.getItem(AUTH_ACCESS_TOKEN_KEY);
  const idToken = localStorage.getItem(AUTH_ID_TOKEN_KEY);
  const refreshToken = localStorage.getItem(AUTH_REFRESH_TOKEN_KEY);
  if (!accessToken || !idToken || !refreshToken) return null;
  return { accessToken, idToken, refreshToken };
}

export function clearTokens(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(AUTH_ACCESS_TOKEN_KEY);
  localStorage.removeItem(AUTH_ID_TOKEN_KEY);
  localStorage.removeItem(AUTH_REFRESH_TOKEN_KEY);
}

function decodeJwtPayload(token: string): Record<string, unknown> | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const b64 = parts[1]!;
    const padded = b64.replace(/-/g, "+").replace(/_/g, "/");
    const padLen = (4 - (padded.length % 4)) % 4;
    const base64 = padded + "=".repeat(padLen);
    const json = atob(base64);
    return JSON.parse(json) as Record<string, unknown>;
  } catch {
    return null;
  }
}

/** Email from ID token payload (display only; not cryptographically verified). */
export function getStoredAuthEmail(): string | null {
  const tokens = getTokens();
  if (!tokens) return null;
  const payload = decodeJwtPayload(tokens.idToken);
  if (!payload) return null;
  const email = payload.email;
  if (typeof email === "string" && email.length > 0) return email;
  return null;
}

export function setPkceVerifier(verifier: string): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(PKCE_VERIFIER_KEY, verifier);
}

export function getPkceVerifier(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(PKCE_VERIFIER_KEY);
}

export function clearPkceVerifier(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(PKCE_VERIFIER_KEY);
}
