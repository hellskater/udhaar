import type { FastifyServerOptions } from "fastify";
import fastify from "fastify";
import sensible from "@fastify/sensible";
import helmet from "@fastify/helmet";
import cors from "@fastify/cors";
import {
  fastifyTRPCPlugin,
  type FastifyTRPCPluginOptions,
} from "@trpc/server/adapters/fastify";
import { appRouter, createTRPCContext, type AppRouter } from "@udhaar/api";
import { fastifyPostgresJs } from "@udhaar/db/fastify";

export const build = (opts?: FastifyServerOptions) => {
  const app = fastify(opts);

  // essential middlewares
  app.register(sensible);

  app.register(cors, {
    origin: "*",
    credentials: true,
  });

  app.register(helmet);

  // db
  app.register(fastifyPostgresJs);

  // routes
  app.register(fastifyTRPCPlugin, {
    prefix: "/api/trpc",
    trpcOptions: {
      router: appRouter,
      createContext: createTRPCContext,
      onError({ path, error, ctx }) {
        ctx?.req.server.log.error(
          `Error in tRPC handler on path '${path}': ${error.message}`
        );
      },
    } satisfies FastifyTRPCPluginOptions<AppRouter>["trpcOptions"],
  });

  return app;
};
