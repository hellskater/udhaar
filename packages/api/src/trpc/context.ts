import type { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";
import { type CtxSql } from "@udhaar/db/fastify";

declare module "fastify" {
  interface FastifyInstance {
    sql: CtxSql;
  }
}

export async function createTRPCContext({
  req,
  res,
}: CreateFastifyContextOptions) {
  return {
    fastify: req.server,
    logger: req.server.log,
    sql: req.server.sql,
    req,
    res,
  };
}

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;
