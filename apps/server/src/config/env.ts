import z from "zod";

export const envSchema = z.object({
  PORT: z.coerce.number().int(),
  NODE_ENV: z.string(),
});

export const env = envSchema.parse(process.env);
