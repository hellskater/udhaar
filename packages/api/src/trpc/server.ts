import { initTRPC } from "@trpc/server";
import { ZodError } from "zod";
import SuperJSON from "superjson";

import { type Context } from "./context.js";

const t = initTRPC.context<Context>().create({
  transformer: SuperJSON,
  errorFormatter(opts) {
    const { shape, error } = opts;

    return {
      ...shape,
      data: {
        ...shape.data,
        ...(error.code === "BAD_REQUEST" &&
          error.cause instanceof ZodError && {
            zodError: error.cause.flatten(),
          }),
      },
    };
  },
});

export const { router: createTRPCRouter } = t;

export const publicProcedure = t.procedure;
