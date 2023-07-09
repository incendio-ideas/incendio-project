import { createClient } from '@supabase/supabase-js';
import { derived, writable } from 'svelte/store';
import { PUBLIC_SUPABASE_API_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

export type Node = {
  x: number;
  y: number;
  moving: boolean;
  timestamp?: number;
};

export const nodesStore = writable<Record<string, Node>>({});

const lastCheckedTimestampStore = writable(0);

export const nodesDiffStore = derived(
  [nodesStore, lastCheckedTimestampStore],
  ([$nodesStore, $lastCheckedTimestampStore]) => {
    const nodesDiff: Record<string, Node> = {};

    console.log($lastCheckedTimestampStore);

    for (const [key, node] of Object.entries($nodesStore)) {
      if ($lastCheckedTimestampStore < (node.timestamp ?? 0)) {
        nodesDiff[key] = node;
      }
    }

    $lastCheckedTimestampStore = Date.now();
    return nodesDiff;
  },
);

export const supabaseClient = createClient(PUBLIC_SUPABASE_API_URL, PUBLIC_SUPABASE_ANON_KEY);
