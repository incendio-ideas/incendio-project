import { router } from '$lib/trpc';
import { create } from './create';
import { list } from './list';

export const usersRouter = router({
  create,
  list,
});
