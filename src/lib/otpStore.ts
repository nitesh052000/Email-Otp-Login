import { sendMail } from "./mailer";
import crypto from "crypto";

type OTPEntry = {
  hash: string;
  expiresAt: number;
};

declare global {
  var otpStore: Map<string, OTPEntry> | undefined;
}

const store: Map<string, OTPEntry> = globalThis.otpStore || new Map();
globalThis.otpStore = store;


const SECRET = process.env.AUTH_SECRET;
if (!SECRET) throw new Error("AUTH_SECRET is not set in .env.local");

function hashCode(code: string) {
  return crypto.createHmac("sha256", SECRET as string).update(code).digest("hex");
}

export function setOTP(email: string, code: string, ttlMs = 10 * 60 * 1000) {
  const hash = hashCode(code);
  store.set(email, { hash, expiresAt: Date.now() + ttlMs });
  console.log("store",store);

  // send OTP email
  sendMail(
    email,
    "Your OTP Code",
    `Your OTP code is ${code}`,
    `<p>Your OTP code is <b>${code}</b></p>`
  );
}

export function verifyOTP(email: string, code: string) {
  const entry = store.get(email);

  // Check 1: Is the OTP entry even found?
  console.log("OTP entry found:", !!entry);
  if (!entry) return false;

  // Check 2: Has the OTP expired?
  console.log("OTP expired:", Date.now() > entry.expiresAt);
  if (Date.now() > entry.expiresAt) {
    store.delete(email);
    return false;
  }

  // Check 3: Do the hashes match?
  const hash = hashCode(code);
  console.log("Stored hash:", entry.hash);
  console.log("Generated hash:", hash);
  const valid = entry.hash === hash;

  console.log("OTP valid:", valid);
  if (valid) store.delete(email); // consume OTP
  return valid;
}