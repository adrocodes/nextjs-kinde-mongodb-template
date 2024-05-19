import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const response = NextResponse.next();
  response.headers.set("x-req-pathname", pathname);

  return response;
}

export const config = {
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    "/((?!_next|_vercel|.*\\..*).*)",
  ],
};
