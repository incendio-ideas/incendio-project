<script lang="ts">
  import { page } from '$app/stores';
  import { trpc } from '$lib/trpc/client';
  import type { PageData } from './$types';

  export let data: PageData;

  const client = trpc($page);
  let clientData: string | undefined;
  let isLoading = false; 

  const load = async () => {
    isLoading = true;
    clientData = await client.greeting.query()
    isLoading = false;
  };
</script>

<h6>Loading data in<br /><code>+page.svelte</code></h6>

<a
  href="#load"
  role="button"
  class="secondary"
  aria-busy={isLoading}
  on:click|preventDefault={load}>Load</a
>

<p>
  Dynamic: 
  {#if clientData}
    {clientData}
  {:else if isLoading}
    <em>loading...</em>
  {:else}
    <b>No data yet fetched</b>
  {/if}
</p>

<p>Static: {data.greeting}</p>
