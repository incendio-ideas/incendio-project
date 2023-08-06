<script lang="ts">
  export let startX = 0;
  export let startY = 0;
  export let endX = 0;
  export let endY = 0;

  $: control1 = startX + (endX - startX) * 0.5;
  $: control2 = startY + (endY - startY) * 0.75;
</script>

<path
  d={`M ${startX} ${startY} C ${control1} ${startY}, ${control1} ${control2}, ${endX} ${endY}`}
  stroke="black"
  fill="transparent"
/>
