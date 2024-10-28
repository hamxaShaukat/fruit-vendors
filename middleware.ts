// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("authToken"); // Cookie set on authentication

  // Define the paths to protect
  const protectedPaths = ["/dashboard"];

  const pathIsProtected = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (pathIsProtected && !token) {
    // Redirect to login if the user is not authenticated
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}
