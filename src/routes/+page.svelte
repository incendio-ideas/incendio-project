<script lang="ts">
  import { page } from '$app/stores';
  import { trpc } from '$lib/trpc/client';
  import type { PageData } from './$types';

  export let data: PageData;

  let user = {
    email: '',
    username: '',
  }

  const client = trpc($page);

  const createUser = async () => {
    const newUser = await client.users.create.mutate(user)

    user = {
      email: '',
      username: '',
    }

    data.users = [...data.users, newUser]
  }
</script>

<form on:submit|preventDefault={createUser}>
  <input type="email" bind:value={user.email} />
  <input type="text" bind:value={user.username} />
  <button>Create</button>
</form>

<ul>
  {#each data.users as user}
    <li>{user.username}</li>
  {/each}
</ul>
