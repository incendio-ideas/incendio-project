import type { Router } from '$lib/trpc/router';
import type { CreateTRPCProxyClient } from '@trpc/client';
import { createTRPCClient, type TRPCClientInit } from 'trpc-sveltekit';

let browserClient: CreateTRPCProxyClient<Router>;

export function trpc(init?: TRPCClientInit) {
  const isBrowser = typeof window !== 'undefined';

  if (isBrowser && browserClient) {
    return browserClient;
  }

  const client = createTRPCClient<Router>({ init });

  if (isBrowser) {
    browserClient = client;
  }

  return client;
}
