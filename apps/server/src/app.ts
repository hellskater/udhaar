import type { FastifyServerOptions } from "fastify";
import fastify from "fastify";
import sensible from "@fastify/sensible";

export const build = (opts?: FastifyServerOptions) => {
  const app = fastify(opts);

  app.register(sensible);
  return app;
};
