import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const COOKIE = "mufat_admin_session";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function secret() {
  const s = process.env.ADMIN_SECRET?.trim();
  if (!s) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("ADMIN_SECRET production’da zorunludur.");
    }
    return "mufat-local-dev-secret-change-me";
  }
  return s;
}

export function adminCredentials() {
  const user = process.env.ADMIN_USER?.trim() || "admin";
  const password = process.env.ADMIN_PASSWORD?.trim();
  if (!password) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("ADMIN_PASSWORD production’da zorunludur.");
    }
    return { user, password: "mufat2026" };
  }
  return { user, password };
}

function timingSafeEqualStr(a: string, b: string) {
  if (a.length !== b.length) return false;
  let out = 0;
  for (let i = 0; i < a.length; i++) out |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return out === 0;
}

function bytesToHex(bytes: ArrayBuffer) {
  return [...new Uint8Array(bytes)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

function toBase64Url(str: string) {
  const bytes = new TextEncoder().encode(str);
  let bin = "";
  bytes.forEach((b) => {
    bin += String.fromCharCode(b);
  });
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function fromBase64Url(str: string) {
  const pad = str.length % 4 === 0 ? "" : "=".repeat(4 - (str.length % 4));
  const b64 = (str + pad).replace(/-/g, "+").replace(/_/g, "/");
  const bin = atob(b64);
  const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

async function sign(payload: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  return bytesToHex(sig);
}

async function encodeSession(user: string, exp: number) {
  const body = toBase64Url(JSON.stringify({ user, exp }));
  return `${body}.${await sign(body)}`;
}

async function decodeSession(token: string | undefined): Promise<{ user: string; exp: number } | null> {
  if (!token) return null;
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;
  const expected = await sign(body);
  if (!timingSafeEqualStr(sig, expected)) return null;
  try {
    const data = JSON.parse(fromBase64Url(body)) as { user: string; exp: number };
    if (!data.user || !data.exp || Date.now() > data.exp) return null;
    return data;
  } catch {
    return null;
  }
}

export function verifyPassword(user: string, password: string) {
  const creds = adminCredentials();
  return timingSafeEqualStr(user, creds.user) && timingSafeEqualStr(password, creds.password);
}

export async function createSession(user: string) {
  const exp = Date.now() + MAX_AGE * 1000;
  const token = await encodeSession(user, exp);
  const jar = await cookies();
  jar.set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function destroySession() {
  const jar = await cookies();
  jar.delete(COOKIE);
}

export async function getSession(): Promise<{ user: string } | null> {
  const jar = await cookies();
  const data = await decodeSession(jar.get(COOKIE)?.value);
  return data ? { user: data.user } : null;
}

export async function getSessionFromRequest(req: NextRequest): Promise<{ user: string } | null> {
  const data = await decodeSession(req.cookies.get(COOKIE)?.value);
  return data ? { user: data.user } : null;
}

export function unauthorized() {
  return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
}

export async function requireApiSession() {
  const session = await getSession();
  if (!session) return null;
  return session;
}
