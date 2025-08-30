import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();  // ✅ await required
  cookieStore.delete("session");        // now delete exists
  return NextResponse.json({ ok: true });
}
