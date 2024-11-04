import z from "zod";

export const ZExpenseEntry = z.object({
  member_id: z.number(),
  expense_id: z.number(),
  shares: z.number(),
});

export type TExpenseEntry = z.infer<typeof ZExpenseEntry>;
