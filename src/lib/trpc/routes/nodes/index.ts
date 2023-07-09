import { router } from '$lib/trpc';
import { finishMoving } from './finish-moving';
import { startMoving } from './start-moving';
export const nodesRouter = router({
  startMoving,
  finishMoving,
});
