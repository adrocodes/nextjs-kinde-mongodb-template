import { verifyKindeWebhookRequest } from "@/modules/kinde/webhooks/verify-request";
import { prisma } from "@/modules/prisma/client";
import { Err, TryAsync } from "@/modules/utils/result";
import { NextResponse } from "next/server";
import { z } from "zod";

const Payload = z.object({
  data: z.object({
    user: z.object({
      id: z.string().min(1),
    }),
  }),
});

export async function POST(request: Request) {
  const rEvent = await TryAsync(verifyKindeWebhookRequest)(request);

  if (Err(rEvent)) {
    console.error(rEvent.message);
    return NextResponse.json({ message: rEvent.message }, { status: 400 });
  }

  const pPayload = Payload.safeParse(rEvent);

  if (!pPayload.success) {
    console.error(pPayload.error.message);
    return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
  }

  try {
    await prisma.user.create({
      data: {
        authId: pPayload.data.data.user.id,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Unable to create user" },
      { status: 500 }
    );
  }

  return NextResponse.json({ status: 200, statusText: "success" });
}
