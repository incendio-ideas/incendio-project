<script lang="ts">
  import { enhance } from '$app/forms';
  import { fly, slide } from 'svelte/transition';

  export let data;
  export let form;

  let name = '';
  let creating: { id: string; name: string }[] = [];
</script>

<pre>
  {JSON.stringify(form, null, 2)}
</pre>

<form
  method="POST"
  action="?/create"
  use:enhance={() => {
    const optimisticId = `optimistic-${Math.random().toString(36).slice(2)}`;

    creating = [
      ...creating,
      {
        id: optimisticId,
        name,
      },
    ];

    return async ({ update }) => {
      await update();
      creating = creating.filter(({ id }) => id !== optimisticId);
    };
  }}
>
  <input required name="name" type="text" bind:value={name} />
  <button type="submit">Create board</button>
</form>

<ul>
  {#each [...data.boards, ...creating] as board (board.id)}
    <li in:fly out:slide>
      <a
        class={(board.id.startsWith('optimistic') && 'border border-red-500') || null}
        data-creating={board.id.startsWith('optimistic')}
        href="/editor/{board.id}">{board.id} {board.name}</a
      >
    </li>
  {/each}
</ul>
