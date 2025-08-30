// src/lib/otpStore.ts
import { Redis } from "@upstash/redis";
import crypto from "crypto";

const redis = Redis.fromEnv(); // Reads UPSTASH_REDIS_REST_URL & TOKEN from env

function hashCode(code: string, secret: string) {
  return crypto.createHmac("sha256", secret).update(code).digest("hex");
}

export async function setOTP(email: string, code: string, ttlSec = 600) {
  const secret = process.env.AUTH_SECRET!;
  const hash = hashCode(code, secret);
  await redis.set(email, hash, { ex: ttlSec });
  console.log("OTP stored for", email);
}

export async function verifyOTP(email: string, code: string) {
  const secret = process.env.AUTH_SECRET!;
  const storedHash = await redis.get(email);
  console.log("Stored OTP hash:", storedHash);
  if (!storedHash) return false;

  const valid = storedHash === hashCode(code, secret);
  if (valid) await redis.del(email); // consume OTP
  return valid;
}
