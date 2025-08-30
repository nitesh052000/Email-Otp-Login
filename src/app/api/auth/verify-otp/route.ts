// src/pages/api/auth/verify-otp.ts
import { NextResponse } from "next/server";
import { verifyOTP } from "@/lib/otpStore";
import crypto from "crypto";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const { email, code } = await req.json();
  const ok = await verifyOTP(email, code);
  if (!ok) return NextResponse.json({ error: "Invalid code" }, { status: 400 });

  // create session token
  const token = crypto.randomBytes(32).toString("hex");
  const cookieStore = await cookies();
  cookieStore.set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // ✅ only secure in production
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60,
    path: "/",
  });

  return NextResponse.json({ ok: true });
}
