import { trpc } from '$lib/trpc/client';
import type { PageServerLoad } from './$types';

export const load = (async (event) => {
  const client = trpc(event);

  return {
    boards: await client.graphs.list.query(),
  };
}) satisfies PageServerLoad;
