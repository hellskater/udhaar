import { createTRPCRouter, publicProcedure } from "@/trpc/server.js";

export const healthRouter = createTRPCRouter({
  healthCheck: publicProcedure.query(async () => {
    return {
      status: "running",
      time: new Date(),
    };
  }),
});
