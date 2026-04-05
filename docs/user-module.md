# User / auth module

## Section 1 — Overview

The user/auth module adds client-only sign-in and registration against **AWS Cognito**: email/password (SRP via `amazon-cognito-identity-js`) and **Google** via the Cognito hosted UI with **PKCE** (no client secret). Tokens live in **localStorage**; the PKCE verifier lives in **sessionStorage** until the OAuth code is exchanged. The app uses **`output: "export"`** — there are no App Router API routes; all logic runs in the browser. Owning files: `src/lib/auth-storage.ts`, `src/lib/cognito.ts`, `src/components/auth-form.tsx`, `src/app/auth/page.tsx`, `src/app/auth/callback/page.tsx`, and `src/app/auth/callback/auth-callback-client.tsx`.

## Section 2 — File Map

| File | Role |
|------|------|
| `src/lib/auth-storage.ts` | Token persistence (localStorage + sessionStorage PKCE) |
| `src/lib/cognito.ts` | Cognito SDK calls + PKCE OAuth helpers |
| `src/components/auth-form.tsx` | UI — login / register tabs + Google button |
| `src/app/auth/page.tsx` | Route — metadata wrapper |
| `src/app/auth/callback/page.tsx` | Route — Suspense + metadata wrapper |
| `src/app/auth/callback/auth-callback-client.tsx` | Client — OAuth callback (`useSearchParams`) |

## Section 3 — Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_COGNITO_USER_POOL_ID` | Yes | Cognito User Pool ID (e.g. `us-east-1_XXXXXXXXX`) |
| `NEXT_PUBLIC_COGNITO_CLIENT_ID` | Yes | App Client ID (public client — no secret) |
| `NEXT_PUBLIC_COGNITO_REGION` | Documented | AWS region (e.g. `us-east-1`); reserved for future use — not read by current code |
| `NEXT_PUBLIC_COGNITO_DOMAIN` | Google only | Cognito hosted UI domain, no `https://` prefix |
| `NEXT_PUBLIC_COGNITO_REDIRECT_URI` | Google only | Full callback URL registered in the App Client |

All variables are `NEXT_PUBLIC_*` because the module runs entirely in the browser.

## Section 4 — Token Storage Schema

### localStorage (persists across sessions)

| Key | Content | Source |
|-----|---------|--------|
| `auth_access_token` | Cognito Access Token (JWT) | `signIn` result / OAuth token exchange |
| `auth_id_token` | Cognito ID Token (JWT, contains `sub` / email) | Same |
| `auth_refresh_token` | Cognito Refresh Token (opaque) | Same |

### sessionStorage (single-tab, cleared after use)

| Key | Content | Lifetime |
|-----|---------|----------|
| `pkce_code_verifier` | Random base64url string (32 bytes) | Written before Google redirect; deleted after token exchange |

### OAuth dedupe (sessionStorage)

| Key | Content | Lifetime |
|-----|---------|----------|
| `cognito_oauth_code_lock` | Authorization `code` string | Set before token exchange; removed on success or error |

## Section 5 — API Reference

### `src/lib/auth-storage.ts`

```
setTokens({ accessToken, idToken, refreshToken }): void
  Writes all three tokens to localStorage. No-op if window is undefined.

getTokens(): { accessToken, idToken, refreshToken } | null
  Returns all three tokens or null if any key is missing.

clearTokens(): void
  Removes all three token keys from localStorage.

setPkceVerifier(verifier: string): void
  Writes the PKCE code verifier to sessionStorage.

getPkceVerifier(): string | null
  Reads the PKCE code verifier from sessionStorage.

clearPkceVerifier(): void
  Removes the PKCE code verifier from sessionStorage.
```

### `src/lib/cognito.ts`

```
signIn(email: string, password: string): Promise<{ accessToken, idToken, refreshToken }>
  Authenticates via CognitoUser.authenticateUser (SRP flow).
  Rejects with a Cognito error object ({ message, code }) on failure.
  Common error codes: NotAuthorizedException, UserNotFoundException,
  UserNotConfirmedException.

signUp(email: string, password: string): Promise<void>
  Registers a new user in the Cognito User Pool.
  Email is passed as both the username and a CognitoUserAttribute.
  Does NOT sign in — the user must confirm their email first (pool-dependent).
  Common error codes: UsernameExistsException, InvalidPasswordException.

initiateGoogleSignIn(): Promise<void>
  Generates a PKCE code verifier + SHA-256 challenge.
  Stores the verifier in sessionStorage via setPkceVerifier().
  Redirects window.location.href to the Cognito OAuth2 /authorize endpoint
  with identity_provider=Google. Never resolves on success (page navigates away).
  Rejects only if crypto.subtle is unavailable or env vars are missing.

handleOAuthCallback(code: string): Promise<{ accessToken, idToken, refreshToken }>
  Retrieves the PKCE verifier from sessionStorage (throws if missing).
  POSTs to Cognito's /oauth2/token endpoint to exchange the auth code.
  Calls clearPkceVerifier() on success.
  Throws with error_description from Cognito on HTTP error.
```

## Section 6 — Data Flows

### Email / Password Login

```
User fills email+password → handleSubmit()
  → signIn(email, password)          [cognito.ts]
    → CognitoUser.authenticateUser() [amazon-cognito-identity-js]
      ← { AccessToken, IdToken, RefreshToken }
  → setTokens(tokens)                [auth-storage.ts → localStorage]
  → router.push("/")
```

### Registration

```
User fills email+password+confirm → handleSubmit()
  → client-side: password === confirmPassword check
  → signUp(email, password)          [cognito.ts]
    → userPool.signUp()              [amazon-cognito-identity-js]
      ← void (success)
  → show success message: "Check your email to verify your address."
  → setTab("login")
  (user must verify email before signing in)
```

### Google OAuth (PKCE)

```
User clicks "Sign in with Google"
  → initiateGoogleSignIn()           [cognito.ts]
    → generateCodeVerifier()         random 32-byte base64url string
    → generateCodeChallenge()        base64url(SHA-256(verifier))
    → setPkceVerifier(verifier)      [auth-storage.ts → sessionStorage]
    → redirect to:
        https://{COGNITO_DOMAIN}/oauth2/authorize
          ?identity_provider=Google
          &response_type=code
          &code_challenge=...
          &code_challenge_method=S256
          &...

[Google auth completes in browser]

Cognito redirects to {REDIRECT_URI}?code={authCode}
  → AuthCallbackClient (useEffect)   [auth-callback-client.tsx]
    → handleOAuthCallback(code)      [cognito.ts]
      → getPkceVerifier()            [auth-storage.ts ← sessionStorage]
      → POST /oauth2/token           { code, code_verifier, client_id, redirect_uri }
        ← { access_token, id_token, refresh_token }
      → clearPkceVerifier()
    → setTokens(tokens)              [auth-storage.ts → localStorage]
    → router.replace("/")
```

## Section 7 — Error Handling

- Cognito and `fetch` errors bubble to the form or callback as messages; the form uses `role="alert"` for errors.
- The callback page shows a full error state with a "Try again" link to `/auth`.
- There is no server-side error logging.

Common Cognito error codes the UI may surface:

| Code | User-visible trigger |
|------|---------------------|
| `NotAuthorizedException` | Wrong password |
| `UserNotFoundException` | Email not registered |
| `UserNotConfirmedException` | Email not yet verified |
| `UsernameExistsException` | Email already registered |
| `InvalidPasswordException` | Password doesn't meet policy |

## Section 8 — AWS Console Prerequisites

1. **User Pool**: Create a Cognito User Pool with email sign-in enabled.
2. **App Client**: Create a public app client (no client secret); enable "Authorization code grant"; enable PKCE.
3. **Callback URLs**: Add `http://localhost:3000/auth/callback` (dev) and the production URL to "Allowed callback URLs" (match `NEXT_PUBLIC_COGNITO_REDIRECT_URI` exactly, including trailing slash if your host uses `trailingSlash`).
4. **Sign-out URLs**: Add `http://localhost:3000` and production URL to "Allowed sign-out URLs".
5. **Google IdP**: Under "Sign-in experience → Federated identity provider sign-in", add Google with a Google OAuth 2.0 client ID and secret from Google Cloud Console.
6. **Attribute mapping**: Map Google `email` → Cognito `email`; `sub` → Cognito `username` (as required by your pool).
7. **Cognito Domain**: Create or assign a Cognito-hosted domain.

## Section 9 — Constraints and Gotchas

- **Static export (`output: "export"`)**: All auth logic runs in the browser. No API routes. Token exchange uses `fetch` in `useEffect` only.
- **`useSearchParams` + static export**: The callback route wraps the client that calls `useSearchParams()` in `<Suspense>` so `pnpm build` can statically generate the shell.
- **No client secret**: The Cognito App Client must have no client secret. PKCE replaces the secret for public clients.
- **PKCE verifier in sessionStorage**: The verifier must survive the redirect to Cognito and back. `sessionStorage` (not `localStorage`) scopes it to the tab.
- **Email verification**: After `signUp`, the user cannot sign in until they confirm via email (unless the pool auto-confirms).
- **Token expiry**: Access Tokens expire after ~1 hour by default. Refresh flow is not implemented — add `refreshSession()` if needed.
- **`crypto.subtle`**: Requires a secure context (HTTPS or localhost). Google sign-in fails if `crypto.subtle` is missing.
- **React Strict Mode**: The callback uses a sessionStorage lock keyed by the auth `code` so the authorization code is only exchanged once if effects run twice in development.
