<script lang="ts">
  import { page } from '$app/stores';
</script>

<ul>
  {#each $page.data.boards as board (board.id)}
    <li>
      <a href="/editor/{board.id}">{board.name}</a>
    </li>
  {/each}
</ul>

