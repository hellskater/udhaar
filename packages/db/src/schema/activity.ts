import z from "zod";

export const ZActivityType = z.enum([
  "update_group",
  "create_expense",
  "update_expense",
  "delete_expense",
]);

export type TActivityType = z.infer<typeof ZActivityType>;

export const ZActivity = z.object({
  id: z.number(),
  group_id: z.string().uuid(),
  member_id: z.number(),
  expense_id: z.number(),
  data: z.string().optional(),
  activity_type: ZActivityType,
  created_at: z.string(),
});

export type TActivity = z.infer<typeof ZActivity>;
