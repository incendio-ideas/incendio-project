// This function exists because TouchEvent is not supported by desktop safari.
// https://caniuse.com/?search=TouchEvent
export const isTouchEvent = (event: unknown): event is TouchEvent => {
  return typeof event === 'object' && event !== null && 'touches' in event;
};
