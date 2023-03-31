import { createContext } from '$lib/trpc/context';
import { rootRouter } from '$lib/trpc/router';
import type { Handle } from '@sveltejs/kit';
import { createTRPCHandle } from 'trpc-sveltekit';

export const handle: Handle = createTRPCHandle({ router: rootRouter, createContext });
