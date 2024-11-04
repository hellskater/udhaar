import z from "zod";

export const ZSplitMode = z.enum(["even", "share", "percentage", "amount"]);

export type TSplitMode = z.infer<typeof ZSplitMode>;

export const ZExpense = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().optional(),
  expense_date: z.string(),
  amount: z.number(),
  member_id: z.number(),
  group_id: z.string().uuid(),
  is_payback: z.boolean(),
  split_mode: ZSplitMode,
  created_at: z.string(),
});

export type TExpense = z.infer<typeof ZExpense>;
