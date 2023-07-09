import { trpc } from '$lib/trpc/client';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async (event) => {
  const client = trpc(event);

  return {
    boards: await client.boards.list.query(),
  };
}) satisfies PageServerLoad;

export const actions = {
  create: async (event) => {
    const client = trpc(event);
    const data = await event.request.formData();

    const name = data.get('name');

    if(!name) {
      return fail(400, {
        errors: {
          name: 'Name is required'
        }
      })
    }

    if(typeof name !== 'string') {
      return fail(400, {
        errors: {
          name: 'Name must be a string'
        }
      })
    }

    if(name.length === 1) {
      return fail(400, {
        errors: {
          name: 'Name must be non empty string'
        }
      })
    }

    await new Promise((fulfil) => setTimeout(fulfil, 1000));

    return client.boards.create.mutate({
      name
    })
  } 
}