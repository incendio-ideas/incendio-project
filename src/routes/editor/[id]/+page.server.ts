import { trpc } from '$lib/trpc/client';
import type { PageServerLoad } from './$types';

export const load = (async (event) => {
  const client = trpc(event);

  const graph = await client.graphs.byId.query({ id: event.params.id });
  const nodesById = Object.fromEntries(graph?.nodes.map((node) => [node.id, node]) ?? []);

  return { graph, nodesById };
}) satisfies PageServerLoad;
