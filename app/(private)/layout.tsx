import { KINDE_LOGIN_PATH } from "@/modules/kinde/constants";
import { KindeRequestPathname } from "@/modules/kinde/utility/request-pathname";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import type { PropsWithChildren } from "react";

export default async function Layout({ children }: PropsWithChildren) {
  const { isAuthenticated } = getKindeServerSession();

  if (!(await isAuthenticated())) {
    const pathname = KindeRequestPathname.get();
    const search = new URLSearchParams();

    if (pathname) {
      search.set("post_login_redirect_url", pathname);
    }

    redirect(KINDE_LOGIN_PATH + "?" + search.toString());
  }

  return <>{children}</>;
}
