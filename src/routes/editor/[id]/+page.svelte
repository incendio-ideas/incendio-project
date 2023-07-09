<script lang="ts">
  import GrainBg from '$lib/components/ui/GrainBg.svelte';
  import Node from '$lib/components/features/Node.svelte';
  import type { PageData } from './$types';
  import {
    nodesStore,
    supabaseClient,
    nodesDiffStore,
    type Node as NodeType,
  } from '$lib/stores/nodes';
  import { onMount } from 'svelte';
  import type { RealtimeChannel } from '@supabase/supabase-js';

  export let data: PageData;

  $nodesStore = data.nodesById;
  let channel: RealtimeChannel;

  onMount(() => {
    channel = supabaseClient.channel(data.graph?.id ?? '');

    channel
      .on('broadcast', { event: 'message' }, ({ payload }) => {
        nodesStore.update((nodes) => {
          for (const [id, node] of Object.entries<NodeType>(payload.nodes)) {
            if ((nodes[id].timestamp ?? 0) > (node.timestamp ?? 0)) continue;
            nodes[id] = node;
          }

          return nodes;
        });
      })
      .subscribe();
  });

  $: {
    if (Object.keys($nodesDiffStore).length > 0) {
      channel.send({
        type: 'broadcast',
        event: 'message',
        payload: {
          nodes: $nodesDiffStore,
        },
      });
    }
  }
</script>

<svg class="min-w-[100vw] min-h-screen" xmlns="http://www.w3.org/2000/svg">
  <GrainBg />

  {#if data.graph === null}
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" class="text-2xl">
      Board not found
    </text>
  {/if}

  {#if data.graph !== null}
    {#each data.graph.nodes as node (node.id)}
      <Node nodeId={node.id} />
    {/each}
  {/if}
</svg>
