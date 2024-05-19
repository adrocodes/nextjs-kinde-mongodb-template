import { getAppUser } from "@/modules/auth/user/get-user";
import { Button } from "@/modules/design-system/ui/button";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function Page() {
  const user = await getAppUser();

  return (
    <>
      <header className="p-4 flex flex-col md:flex-row justify-between items-center gap-4 border-b">
        <h1 className="text-3xl font-bold">
          Hello, {user?.given_name ?? "Friend"}!
        </h1>
        <div className="space-x-4">
          <Button asChild>
            <LogoutLink>Logout</LogoutLink>
          </Button>
        </div>
      </header>
      <div className="p-24">
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </div>
    </>
  );
}
