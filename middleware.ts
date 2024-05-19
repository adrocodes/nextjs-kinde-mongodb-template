import { NextResponse, NextRequest } from "next/server";
import { KindeRequestPathname } from "@/modules/kinde/utility/request-pathname";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  KindeRequestPathname.set(request, response);

  return response;
}

export const config = {
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/_next`, `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    "/((?!_next|_vercel|.*\\..*).*)",
  ],
};
