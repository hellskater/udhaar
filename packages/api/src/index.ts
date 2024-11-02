import { appRouter } from "./routes/index.js";
import { createTRPCContext } from "./trpc/context.js";

export type AppRouter = typeof appRouter;

export { appRouter, createTRPCContext };
