import "server-only";

import { headers } from "next/headers";
import type { NextRequest, NextResponse } from "next/server";

const HEADER_NAME = "x-kinde-req-pathname";

export const KindeRequestPathname = {
  set: (request: NextRequest, response: NextResponse) => {
    response.headers.set(HEADER_NAME, request.nextUrl.pathname);
  },
  get: () => {
    return headers().get(HEADER_NAME);
  },
};
