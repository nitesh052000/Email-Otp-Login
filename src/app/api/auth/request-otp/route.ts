// src/pages/api/auth/request-otp.ts
import { NextResponse } from "next/server";
import { setOTP } from "@/lib/otpStore";
import { sendMail } from "@/lib/mailer";

export async function POST(req: Request) {
  const { email } = await req.json();
  const code = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP

  await setOTP(email, code);

  await sendMail(
    email,
    "Your Verification Code",
    `<p>Your OTP is <strong>${code}</strong></p>`
  );

  return NextResponse.json({ ok: true });
}
