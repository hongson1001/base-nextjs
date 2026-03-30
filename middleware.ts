import { NextResponse, type NextRequest } from "next/server";

const PUBLIC_ROUTES = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/verify-email",
];

const PROTECTED_PREFIXES = ["/dashboard", "/admin", "/settings", "/profile"];

/**
 * Check if the path matches any of the given prefixes.
 */
function matchesPrefix(path: string, prefixes: string[]): boolean {
  return prefixes.some(
    (prefix) => path === prefix || path.startsWith(prefix + "/"),
  );
}

/**
 * Check if the request has a valid auth indicator.
 * Supports both session-cookie and JWT modes.
 */
function isAuthenticated(request: NextRequest): boolean {
  // Session cookie mode: look for a session cookie (adjust name to match your backend)
  const sessionCookie =
    request.cookies.get("connect.sid") ??
    request.cookies.get("session") ??
    request.cookies.get("sid");

  if (sessionCookie?.value) return true;

  // JWT mode: look for an auth token cookie or Authorization header
  const tokenCookie =
    request.cookies.get("accessToken") ?? request.cookies.get("token");

  if (tokenCookie?.value) return true;

  const authHeader = request.headers.get("Authorization");

  if (authHeader?.startsWith("Bearer ")) return true;

  return false;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static files and API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const isPublic = PUBLIC_ROUTES.includes(pathname);
  const isProtected = matchesPrefix(pathname, PROTECTED_PREFIXES);
  const authed = isAuthenticated(request);

  // Redirect authenticated users away from auth pages
  if (isPublic && authed) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Redirect unauthenticated users to login
  if (isProtected && !authed) {
    const loginUrl = new URL("/login", request.url);

    loginUrl.searchParams.set("callbackUrl", pathname);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
