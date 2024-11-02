import type { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";

export async function createTRPCContext({
  req,
  res,
}: CreateFastifyContextOptions) {
  return {
    req,
    res,
  };
}

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;
