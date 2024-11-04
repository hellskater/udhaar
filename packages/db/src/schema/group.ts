import z from "zod";

export const ZGroup = z.object({
  id: z.string().uuid(),
  name: z.string(),
  currency: z.string(),
  created_at: z.string(),
});

export type TGroup = z.infer<typeof ZGroup>;
