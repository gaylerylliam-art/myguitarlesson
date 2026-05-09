import { webcrypto } from "node:crypto";

const subtle = webcrypto.subtle;
let jwksCache = null;
let jwksCachedAt = 0;

function base64UrlDecode(input) {
  const normalized = input.replaceAll("-", "+").replaceAll("_", "/");
  const padded = normalized + "=".repeat((4 - normalized.length % 4) % 4);
  return Buffer.from(padded, "base64");
}

function parseJwt(token) {
  const [encodedHeader, encodedPayload, signature] = token.split(".");
  if (!encodedHeader || !encodedPayload || !signature) {
    throw new Error("Malformed token");
  }

  return {
    encodedHeader,
    encodedPayload,
    signature,
    header: JSON.parse(base64UrlDecode(encodedHeader).toString("utf8")),
    payload: JSON.parse(base64UrlDecode(encodedPayload).toString("utf8"))
  };
}

async function getJwks() {
  const domain = process.env.AUTH0_DOMAIN;
  if (!domain) throw new Error("AUTH0_DOMAIN is not configured");

  const now = Date.now();
  if (jwksCache && now - jwksCachedAt < 60 * 60 * 1000) return jwksCache;

  const url = `https://${domain.replace(/^https?:\/\//, "")}/.well-known/jwks.json`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Unable to fetch Auth0 JWKS");

  jwksCache = await response.json();
  jwksCachedAt = now;
  return jwksCache;
}

async function verifyJwt(token) {
  const { encodedHeader, encodedPayload, signature, header, payload } = parseJwt(token);
  const issuer = `https://${process.env.AUTH0_DOMAIN?.replace(/^https?:\/\//, "")}/`;
  const audience = process.env.AUTH0_AUDIENCE;

  if (header.alg !== "RS256") throw new Error("Unsupported token algorithm");
  if (payload.iss !== issuer) throw new Error("Invalid issuer");
  if (audience) {
    const audiences = Array.isArray(payload.aud) ? payload.aud : [payload.aud];
    if (!audiences.includes(audience)) throw new Error("Invalid audience");
  }
  if (payload.exp && payload.exp * 1000 < Date.now()) throw new Error("Token expired");

  const jwks = await getJwks();
  const jwk = jwks.keys.find((key) => key.kid === header.kid);
  if (!jwk) throw new Error("Signing key not found");

  const key = await subtle.importKey(
    "jwk",
    jwk,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["verify"]
  );

  const verified = await subtle.verify(
    "RSASSA-PKCS1-v1_5",
    key,
    base64UrlDecode(signature),
    Buffer.from(`${encodedHeader}.${encodedPayload}`)
  );

  if (!verified) throw new Error("Invalid token signature");
  return payload;
}

export function authConfig() {
  const domain = process.env.AUTH0_DOMAIN || "";
  const clientId = process.env.AUTH0_CLIENT_ID || "";
  const audience = process.env.AUTH0_AUDIENCE || "";

  return {
    configured: Boolean(domain && clientId),
    domain,
    clientId,
    audience
  };
}

export async function getUserFromRequest(req) {
  const header = req.headers.authorization || req.headers.Authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";

  if (!authConfig().configured) {
    return {
      sub: "local-preview-user",
      name: "Alex",
      authMode: "local"
    };
  }

  if (!token) {
    const error = new Error("Missing bearer token");
    error.status = 401;
    throw error;
  }

  const claims = await verifyJwt(token);
  return {
    sub: claims.sub,
    name: claims.name || claims.nickname || claims.email || "Student",
    email: claims.email || "",
    authMode: "auth0"
  };
}
