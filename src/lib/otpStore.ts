import crypto from "crypto";

type OTPEntry = {
  hash: string;
  expiresAt: number;
};

const store = new Map<string, OTPEntry>();

const SECRET = process.env.AUTH_SECRET;
if (!SECRET) throw new Error("AUTH_SECRET is not set in .env.local");

console.log("secret",SECRET);

function hashCode(code: string) {
  return crypto.createHmac("sha256", SECRET as string).update(code).digest("hex");
}

export function setOTP(email: string, code: string, ttlMs = 10 * 60 * 1000) {
  const hash = hashCode(code);
  store.set(email, { hash, expiresAt: Date.now() + ttlMs });
}

export function verifyOTP(email: string, code: string) {
  const entry = store.get(email);
  if (!entry) return false;
  if (Date.now() > entry.expiresAt) {
    store.delete(email);
    return false;
  }
  const hash = hashCode(code);
  const valid = entry.hash === hash;
  if (valid) store.delete(email); // consume OTP
  return valid;
}
