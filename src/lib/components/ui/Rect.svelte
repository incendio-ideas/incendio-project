<script lang="ts">
  import { movement } from '$lib/actions/movement';

  export let x = 0;
  export let y = 0;
  export let moving = false;
</script>

<rect
  {x}
  {y}
  use:movement
  on:movestart
  on:move
  on:moveend
  width="200"
  height="100"
  fill="blue"
  fill-opacity="0.1"
  stroke="white"
  stroke-width="4"
  role="button"
  tabindex="0"
  class:moving
/>

<slot />

<style lang="postcss">
  .moving {
    @apply stroke-red-500;
  }
</style>
