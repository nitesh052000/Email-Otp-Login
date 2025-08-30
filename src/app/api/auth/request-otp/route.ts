import { NextResponse } from "next/server";
import { z } from "zod";
import { setOTP } from "@/lib/otpStore";

const schema = z.object({ email: z.string().email() });

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parse = schema.safeParse(body);
    if (!parse.success) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setOTP(parse.data.email, code);

    console.log("OTP for", parse.data.email, "=", code);

    return NextResponse.json({ ok: true, devCode: code });
  } catch (err) {
    console.error("request-otp error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
