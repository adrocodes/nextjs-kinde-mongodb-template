import { prisma } from "@/modules/prisma/client";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";

type AppUser = KindeUser & {
  mongo: {
    /** MongoDB user record ID */
    _id: string;
  };
};

export async function getAppUser(): Promise<AppUser | undefined> {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) return undefined;

  const dbUser = await prisma.user.findUnique({
    where: {
      authId: user.id,
    },
  });
  if (!dbUser) return undefined;

  return {
    ...user,
    mongo: {
      _id: dbUser.id,
    },
  } satisfies AppUser;
}
