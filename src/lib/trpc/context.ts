import { getPrisma } from '$lib/prisma/client';
import type { RequestEvent } from '@sveltejs/kit';
import type { inferAsyncReturnType } from '@trpc/server';

export async function createContext(_event: RequestEvent) {
  return {
    prisma: await getPrisma(),
  };
}

export type Context = inferAsyncReturnType<typeof createContext>;
