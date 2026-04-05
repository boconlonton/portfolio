import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
} from "amazon-cognito-identity-js";

import {
  clearPkceVerifier,
  getPkceVerifier,
  setPkceVerifier,
} from "@/lib/auth-storage";

function getPoolConfig() {
  const UserPoolId = process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID;
  const ClientId = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID;
  if (!UserPoolId || !ClientId) {
    throw new Error("Cognito is not configured (missing pool or client id).");
  }
  return { UserPoolId, ClientId };
}

function getUserPool(): CognitoUserPool {
  const { UserPoolId, ClientId } = getPoolConfig();
  return new CognitoUserPool({ UserPoolId, ClientId });
}

function base64UrlEncode(buffer: Uint8Array): string {
  let binary = "";
  for (let i = 0; i < buffer.length; i++) {
    binary += String.fromCharCode(buffer[i]!);
  }
  const base64 = btoa(binary);
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function generateCodeVerifier(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return base64UrlEncode(array);
}

async function generateCodeChallenge(verifier: string): Promise<string> {
  const encoded = new TextEncoder().encode(verifier);
  const digest = await crypto.subtle.digest("SHA-256", encoded);
  return base64UrlEncode(new Uint8Array(digest));
}

function cognitoOAuthEnv() {
  const clientId = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID;
  const domain = process.env.NEXT_PUBLIC_COGNITO_DOMAIN;
  const redirectUri = process.env.NEXT_PUBLIC_COGNITO_REDIRECT_URI;
  if (!clientId || !domain || !redirectUri) {
    throw new Error(
      "Google sign-in requires NEXT_PUBLIC_COGNITO_CLIENT_ID, NEXT_PUBLIC_COGNITO_DOMAIN, and NEXT_PUBLIC_COGNITO_REDIRECT_URI.",
    );
  }
  return { clientId, domain, redirectUri };
}

export async function signIn(
  email: string,
  password: string,
): Promise<{ accessToken: string; idToken: string; refreshToken: string }> {
  const userPool = getUserPool();
  const cognitoUser = new CognitoUser({
    Username: email.trim(),
    Pool: userPool,
  });
  const authDetails = new AuthenticationDetails({
    Username: email.trim(),
    Password: password,
  });

  console.log("authDetails", authDetails);

  return new Promise((resolve, reject) => {
    cognitoUser.authenticateUser(authDetails, {
      onSuccess: (result) => {
        resolve({
          accessToken: result.getAccessToken().getJwtToken(),
          idToken: result.getIdToken().getJwtToken(),
          refreshToken: result.getRefreshToken().getToken(),
        });
      },
      onFailure: (err) => {
        console.error(err);
        reject(err);
      },
    });
  });
}

export async function signUp(email: string, password: string): Promise<void> {
  const userPool = getUserPool();
  return new Promise((resolve, reject) => {
    userPool.signUp(
      email.trim(),
      password,
      [new CognitoUserAttribute({ Name: "email", Value: email.trim() })],
      [],
      (err) => {
        if (err) reject(err);
        else resolve();
      },
    );
  });
}

export async function initiateGoogleSignIn(): Promise<void> {
  if (typeof window === "undefined") {
    throw new Error("Google sign-in is only available in the browser.");
  }
  if (!crypto.subtle) {
    throw new Error(
      "Secure context required for Google sign-in (HTTPS or localhost).",
    );
  }

  const { clientId, domain, redirectUri } = cognitoOAuthEnv();

  const verifier = generateCodeVerifier();
  const challenge = await generateCodeChallenge(verifier);
  setPkceVerifier(verifier);

  const params = new URLSearchParams({
    response_type: "code",
    client_id: clientId,
    redirect_uri: redirectUri,
    identity_provider: "Google",
    scope: "openid email profile",
    code_challenge: challenge,
    code_challenge_method: "S256",
  });

  window.location.href = `https://${domain}/oauth2/authorize?${params.toString()}`;
}

export async function handleOAuthCallback(code: string): Promise<{
  accessToken: string;
  idToken: string;
  refreshToken: string;
}> {
  const verifier = getPkceVerifier();
  if (!verifier) {
    throw new Error("PKCE verifier missing — possible replay attack.");
  }

  const { clientId, domain, redirectUri } = cognitoOAuthEnv();

  const response = await fetch(`https://${domain}/oauth2/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      client_id: clientId,
      redirect_uri: redirectUri,
      code,
      code_verifier: verifier,
    }),
  });

  if (!response.ok) {
    let message = "Token exchange failed.";
    try {
      const body = (await response.json()) as {
        error_description?: string;
        error?: string;
      };
      message = body.error_description ?? body.error ?? message;
    } catch {
      /* ignore */
    }
    throw new Error(message);
  }

  const data = (await response.json()) as {
    access_token?: string;
    id_token?: string;
    refresh_token?: string;
  };

  const accessToken = data.access_token;
  const idToken = data.id_token;
  const refreshToken = data.refresh_token;

  if (!accessToken || !idToken || !refreshToken) {
    throw new Error("Token response was missing required tokens.");
  }

  clearPkceVerifier();

  return { accessToken, idToken, refreshToken };
}
