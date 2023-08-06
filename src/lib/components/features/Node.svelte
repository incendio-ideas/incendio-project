<script lang="ts">
  import Rect from '$lib/components/ui/Rect.svelte';
  import { nodesStore } from '$lib/stores/nodes';
  import { page } from '$app/stores';
  import { trpc } from '$lib/trpc/client';
  import BezierLine from '../ui/BezierLine.svelte';
  import type { MoveEvent, MoveStartEvent } from '$lib/actions/movement';
  import { editorStore } from '$lib/stores/editor';

  const client = trpc($page);

  export let nodeId: string;

  let offsetX = 0;
  let offsetY = 0;

  $: ({ x, y, moving, connectedTo } = $nodesStore[nodeId]);

  const moveStartHandler = async (event: Event) => {
    if (!(event instanceof CustomEvent)) return;

    const { targetX, targetY, clientX, clientY } = (event as MoveStartEvent).detail;

    offsetX = Math.abs(targetX - clientX);
    offsetY = Math.abs(targetY - clientY);

    $nodesStore[nodeId].moving = true;
    $nodesStore[nodeId].timestamp = Date.now();

    await client.nodes.startMoving.mutate({ id: nodeId });
  };

  const moveHandler = (event: Event) => {
    if (!(event instanceof CustomEvent)) return;

    const { clientX, clientY } = (event as MoveEvent).detail;

    const x = (clientX - offsetX) * $editorStore.scale + $editorStore.translateX;
    const y = (clientY - offsetY) * $editorStore.scale + $editorStore.translateY;

    $nodesStore[nodeId].x = x;
    $nodesStore[nodeId].y = y;
    $nodesStore[nodeId].timestamp = Date.now();
  };

  const moveEndHandler = async () => {
    $nodesStore[nodeId].moving = false;
    $nodesStore[nodeId].timestamp = Date.now();

    await client.nodes.finishMoving.mutate({ id: nodeId, x, y });
  };
</script>

<Rect
  {x}
  {y}
  {moving}
  on:movestart={moveStartHandler}
  on:move={moveHandler}
  on:moveend={moveEndHandler}
/>

{#each connectedTo as connectionId, index}
  <BezierLine
    startX={x + 200}
    startY={y + 20 * (index + 1)}
    endX={$nodesStore[connectionId].x}
    endY={$nodesStore[connectionId].y}
  />
{/each}
