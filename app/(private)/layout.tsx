import { KINDE_LOGIN_PATH } from "@/modules/kinde/constants";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { PropsWithChildren } from "react";

export default async function Layout({ children }: PropsWithChildren) {
  const { isAuthenticated } = getKindeServerSession();

  if (!(await isAuthenticated())) {
    const h = headers();
    const pathname = h.get("x-req-pathname");
    const search = new URLSearchParams();

    if (pathname) {
      search.set("post_login_redirect_url", pathname);
    }

    redirect(KINDE_LOGIN_PATH + "?" + search.toString());
  }

  return <>{children}</>;
}
