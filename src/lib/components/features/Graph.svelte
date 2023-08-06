<script lang="ts">
  import { editorStore } from '$lib/stores/editor';
  import { isTouchEvent } from '$lib/utils/is-touch-event';
  import { onMount } from 'svelte';

  let moving = false;

  let startX = 0;
  let startY = 0;

  const handleWheel = (event: WheelEvent) => {
    event.preventDefault();
    const delta = Math.sign(event.deltaY);
    const factor = delta > 0 ? 1.02 : 0.98;
    $editorStore.scale *= factor;
  };

  const handleMousedown = async (event: MouseEvent | TouchEvent) => {
    const { target } = event;
    if (!target) return;

    if (isTouchEvent(event)) {
      const touch = event.touches[0];
      if (!touch) return;

      startX = touch.clientX;
      startY = touch.clientY;
    }

    if (event instanceof MouseEvent) {
      startX = event.clientX;
      startY = event.clientY;
    }

    moving = true;
  };

  const handleMousemove = (event: MouseEvent | TouchEvent) => {
    if (!moving) return;

    let clientX;
    let clientY;

    if (isTouchEvent(event)) {
      const touch = event.touches[0];
      if (!touch) return;

      clientX = touch.clientX;
      clientY = touch.clientY;
    }

    if (event instanceof MouseEvent) {
      clientX = event.clientX;
      clientY = event.clientY;
    }

    if (!clientX || !clientY) return;

    event.preventDefault();

    const deltaX = clientX - startX;
    const deltaY = clientY - startY;

    $editorStore.translateX -= deltaX;
    $editorStore.translateY -= deltaY;

    startX = clientX;
    startY = clientY;
  };

  const handleMouseup = async () => {
    moving = false;
  };

  let bodyWidth = 0;
  let bodyHeight = 0;

  onMount(() => {
    bodyWidth = document.body.clientWidth;
    bodyHeight = document.body.clientHeight;
  });
</script>

<svg
  role="presentation"
  class="min-w-full min-h-screen"
  viewBox={`${$editorStore.translateX} ${$editorStore.translateY} ${
    bodyWidth * $editorStore.scale
  } ${bodyHeight * $editorStore.scale}`}
  on:mousedown={handleMousedown}
  on:mousemove={handleMousemove}
  on:mouseup={handleMouseup}
  on:wheel={handleWheel}
>
  <slot />
</svg>
