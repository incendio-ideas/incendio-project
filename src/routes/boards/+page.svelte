<script lang="ts">
  import { page } from '$app/stores';
  import { trpc } from '$lib/trpc/client';
  import type { Board, Card2Board } from '@prisma/client';
  import type { PageData } from './$types';
  import type { SerializeObject } from '@trpc/server/shared';

  export let data: PageData;

  const client = trpc($page);

  let boardName = '';

  type CreateBoardResponse = {
    cards: SerializeObject<Card2Board>[];
    id: string;
    createdAt: string;
    updatedAt: string;
    name: string;
  };

  const createBoard = async () => {
    const name = boardName.trim();
    boardName = '';

    const optimisticResponse: CreateBoardResponse = {
      id: 'optimistic',
      name,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      cards: [],
    };

    data.boards.push(optimisticResponse);
    data.boards = data.boards;

    const response = await client.boards.create.mutate({ name });

    data.boards = data.boards.map((board) => {
      if (board.id === 'optimistic') {
        return response;
      }

      return board;
    });
  };
</script>

<form method="POST" on:submit|preventDefault={createBoard}>
  <input required name="board-name" type="text" bind:value={boardName} />
  <button type="submit">Create board</button>
</form>

<ul>
  {#each data.boards as board (board.id)}
    <li>
      <a href="/editor/{board.id}">{board.id} {board.name}</a>
    </li>
  {/each}
</ul>
