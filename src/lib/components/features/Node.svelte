<script lang="ts">
  import Rect from '$lib/components/ui/Rect.svelte';
  import { nodesStore } from '$lib/stores/nodes';
  import { page } from '$app/stores';
  import { trpc } from '$lib/trpc/client';

  const client = trpc($page);

  export let nodeId: string;

  let isLocalChange = false;
  let offsetX = 0;
  let offsetY = 0;

  $: ({ x, y, moving } = $nodesStore[nodeId]);

  const handleMousedown = async ({ clientX, clientY, target }: MouseEvent) => {
    if (!target) return;

    const { x, y } = (target as SVGRectElement).getBoundingClientRect();

    offsetX = Math.abs(x - clientX);
    offsetY = Math.abs(y - clientY);

    isLocalChange = true;
    $nodesStore[nodeId].moving = true;
    $nodesStore[nodeId].timestamp = Date.now();

    await client.nodes.startMoving.mutate({ id: nodeId });
  };

  const handleMousemove = ({ clientX, clientY }: MouseEvent) => {
    if (!moving || !isLocalChange) return;

    const x = clientX - offsetX;
    const y = clientY - offsetY;

    $nodesStore[nodeId].x = x;
    $nodesStore[nodeId].y = y;
    $nodesStore[nodeId].timestamp = Date.now();
  };

  const handleMouseup = async () => {
    isLocalChange = false;
    $nodesStore[nodeId].moving = false;
    $nodesStore[nodeId].timestamp = Date.now();
    await client.nodes.finishMoving.mutate({ id: nodeId, x, y });
  };
</script>

<svelte:window on:mousemove={handleMousemove} on:mouseup={handleMouseup} />

<Rect {x} {y} {moving} on:mousedown={handleMousedown} />
