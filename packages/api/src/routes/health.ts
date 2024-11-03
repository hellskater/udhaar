import { createTRPCRouter, publicProcedure } from "@/trpc/server.js";

export const healthRouter = createTRPCRouter({
  healthCheck: publicProcedure.query(async ({ ctx }) => {
    const val = await ctx.sql`select * from "books"`;

    return {
      status: "running",
      time: new Date(),
      val,
    };
  }),
});
