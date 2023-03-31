import { trpc } from '$lib/trpc/client';
import type { PageLoad } from './$types';

export const load = (async (event) => {
  const client = trpc(event);

  return {
    greeting: client.greeting.query(),
  };
}) satisfies PageLoad;
