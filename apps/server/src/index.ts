import helmet from "@fastify/helmet";
import cors from "@fastify/cors";
import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import { appRouter, createTRPCContext } from "@udhaar/api";

import { build } from "./app.js";
import { env } from "./config/env.js";
import { config } from "./config/config.js";

const app = build({
  logger: config[env.NODE_ENV]?.logger,
});

app.register(fastifyTRPCPlugin, {
  prefix: "/api/trpc",
  trpcOptions: {
    router: appRouter,
    createContext: createTRPCContext,
  },
});

app.register(cors, {
  origin: "*",
  credentials: true,
});

app.register(helmet);

app.listen(
  {
    port: env.PORT,
  },
  (err, _address) => {
    if (err) {
      app.log.error(err);
      process.exit(1);
    }
  }
);
