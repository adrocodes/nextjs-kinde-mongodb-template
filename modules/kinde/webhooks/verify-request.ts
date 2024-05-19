import "server-only";

import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";
import { z } from "zod";

// The Kinde issuer URL should already be in your `.env` file
// from when you initially set up Kinde. This will fetch your
// public JSON web keys file
const client = jwksClient({
  jwksUri: `${process.env.KINDE_ISSUER_URL}/.well-known/jwks.json`,
});

const zEvent = z.object({
  type: z.string().min(1),
  data: z.unknown(),
});

export async function verifyKindeWebhookRequest(request: Request) {
  // Get the token from the request
  const token = await request.text();

  // Decode the token
  const decoded = jwt.decode(token, { complete: true });
  if (!decoded) throw new Error("Unable to decode Kinde Token");

  const { kid } = decoded.header;

  // Verify the token
  const key = await client.getSigningKey(kid);
  const signingKey = key.getPublicKey();
  const event = jwt.verify(token, signingKey);

  const pEvent = zEvent.safeParse(event);

  if (!pEvent.success) {
    throw new Error("Invalid event payload");
  }

  return pEvent.data;
}
