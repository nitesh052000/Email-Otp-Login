import { NextResponse } from "next/server";
import { z } from "zod";
import { verifyOTP } from "@/lib/otpStore";
import { cookies } from "next/headers";
import crypto from "crypto";

const schema = z.object({
  email: z.string().email(),
  code: z.string().length(6),
});

export async function POST(req: Request) {
  const body = await req.json();
  const parse = schema.safeParse(body);
  if (!parse.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });

  const { email, code } = parse.data;
  console.log("email",email,"code",code);
  const ok = verifyOTP(email, code);
  console.log("ok",ok);
  if (!ok) return NextResponse.json({ error: "Invalid code" }, { status: 400 });

  // session token
  const token = crypto.randomBytes(32).toString("hex");
 const cookieStore = await cookies();
 cookieStore.set("session", token, {
  httpOnly: true,
  secure: true,
  sameSite: "lax",
  maxAge: 7 * 24 * 60 * 60,
  path: "/",
});
  return NextResponse.json({ ok: true });
}
