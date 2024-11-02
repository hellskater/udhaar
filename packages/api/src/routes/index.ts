import { healthRouter } from "./health.js";

import { createTRPCRouter } from "@/trpc/server.js";

export const appRouter = createTRPCRouter({
  health: healthRouter,
});
