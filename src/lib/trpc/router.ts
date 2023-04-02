import { router } from '$lib/trpc';
import { usersRouter } from './routes/users';

export const rootRouter = router({
  users: usersRouter,
});

export type Router = typeof rootRouter;
