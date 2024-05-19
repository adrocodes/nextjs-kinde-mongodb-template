import "server-only";

import { z } from "zod";

const envSchema = z.string().trim().min(1);

export function env(key: string): string {
  const value = process.env[key];
  const parsedValue = envSchema.safeParse(value);

  if (!parsedValue.success) {
    throw new Error(`${key} is not a valid environment variable`);
  }

  return parsedValue.data;
}
