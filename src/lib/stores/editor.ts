import { writable } from 'svelte/store';

export type EditorStore = {
  translateX: number;
  translateY: number;
  scale: number;
};

export const editorStore = writable<EditorStore>({
  translateX: 0,
  translateY: 0,
  scale: 1,
});
