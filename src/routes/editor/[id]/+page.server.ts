import { trpc } from '$lib/trpc/client';
import type { PageServerLoad } from './$types';

export const load = (async (event) => {
  const client = trpc(event);

  return {
    board: await client.boards.byId.query({ id: event.params.id }),
  };
}) satisfies PageServerLoad;
