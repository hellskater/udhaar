import type { FastifyPluginCallback } from "fastify";
import fp from "fastify-plugin";
import postgres from "postgres";

export type CtxSql = ReturnType<typeof postgres>;

declare module "fastify" {
  interface FastifyInstance {
    sql: CtxSql;
  }
}

export type FastifyPostgresJsOptions<
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  T extends Record<string, postgres.PostgresType> = {},
> = postgres.Options<T>;

const fastifyPostgresJsPlugin: FastifyPluginCallback<
  FastifyPostgresJsOptions
> = (fastify, options, done) => {
  const sql = postgres(options);

  fastify.decorate("sql", sql);
  fastify.addHook("onClose", async () => {
    await sql.end();
  });
  done();
};

export const fastifyPostgresJs = fp(fastifyPostgresJsPlugin);
