import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const session = req.cookies.get("session")?.value;
  const isAuth = Boolean(session);

  if (req.nextUrl.pathname === "/" && isAuth) {
    return NextResponse.redirect(new URL("/hello", req.url));
  }

  if (req.nextUrl.pathname.startsWith("/hello") && !isAuth) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/hello"],
};
