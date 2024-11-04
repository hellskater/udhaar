import z from "zod";

export const ZGroupMember = z.object({
  id: z.number(),
  name: z.string(),
  group_id: z.string().uuid(),
});

export type TGroupMember = z.infer<typeof ZGroupMember>;
