import { router } from '$lib/trpc';
import { list } from './list';

export const edgesRouter = router({
  list,
});
