// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("session")?.value;
  const url = req.nextUrl.clone();

  // Redirect logged-in users away from login page
  if (token && url.pathname === "/") {
    url.pathname = "/hello"; // redirect to home/dashboard
    return NextResponse.redirect(url);
  }

  // Protect /hello route
  if (!token && url.pathname.startsWith("/hello")) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/hello"], // intercept login and protected routes
};
