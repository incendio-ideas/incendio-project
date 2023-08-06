import { isTouchEvent } from '$lib/utils/is-touch-event';
import type { Action } from 'svelte/action';

const MOVE_START = 'movestart';
const MOVE = 'move';
const MOVE_END = 'moveend';

export type MoveStartEvent = CustomEvent<{
  targetX: number;
  targetY: number;
  clientX: number;
  clientY: number;
}>;

export type MoveEvent = CustomEvent<{
  clientX: number;
  clientY: number;
}>;

type MovementAction = Action<
  SVGElement,
  undefined,
  {
    'on:movestart': (event: MoveStartEvent) => void | Promise<void>;
    'on:move': (event: MoveEvent) => void | Promise<void>;
    'on:moveend': () => void | Promise<void>;
  }
>;

export const movement: MovementAction = (node) => {
  let moving = false;

  const moveStartHandler = (event: Event) => {
    if (!(event instanceof MouseEvent || isTouchEvent(event))) {
      console.warn('event is not a MouseEvent or TouchEvent');
      return;
    }

    event.stopPropagation();

    let clientX;
    let clientY;

    if (isTouchEvent(event)) {
      const touch = event.touches[0];
      if (!touch) return;

      clientX = touch.clientX;
      clientY = touch.clientY;
    }

    if (event instanceof MouseEvent) {
      clientX = event.clientX;
      clientY = event.clientY;
    }

    if (!clientX || !clientY) return;

    const { target } = event;
    if (!target) return;

    const { x: targetX, y: targetY } = (target as SVGElement).getBoundingClientRect();

    moving = true;

    document.addEventListener('mousemove', moveHandler);
    document.addEventListener('touchmove', moveHandler);
    document.addEventListener('mouseup', moveEndHandler);
    document.addEventListener('touchend', moveEndHandler);

    node.dispatchEvent(
      new CustomEvent(MOVE_START, {
        detail: {
          targetX,
          targetY,
          clientX,
          clientY,
        },
      }),
    );
  };

  node.addEventListener('mousedown', moveStartHandler);
  node.addEventListener('touchstart', moveStartHandler);

  const moveHandler = (event: MouseEvent | TouchEvent) => {
    if (!moving) return;

    let clientX;
    let clientY;

    if (isTouchEvent(event)) {
      const touch = event.touches[0];
      if (!touch) return;

      clientX = touch.clientX;
      clientY = touch.clientY;
    }

    if (event instanceof MouseEvent) {
      clientX = event.clientX;
      clientY = event.clientY;
    }

    if (!clientX || !clientY) return;

    node.dispatchEvent(new CustomEvent(MOVE, { detail: { clientX, clientY } }));
  };

  const moveEndHandler = () => {
    if (!moving) return;

    moving = false;

    document.removeEventListener('mousemove', moveHandler);
    document.removeEventListener('touchmove', moveHandler);
    document.removeEventListener('mouseup', moveEndHandler);
    document.removeEventListener('touchend', moveEndHandler);

    node.dispatchEvent(new CustomEvent(MOVE_END));
  };

  return {
    destroy() {
      node.removeEventListener('mousedown', moveStartHandler);
      node.removeEventListener('touchstart', moveStartHandler);
      document.removeEventListener('mousemove', moveHandler);
      document.removeEventListener('touchmove', moveHandler);
      document.removeEventListener('mouseup', moveEndHandler);
      document.removeEventListener('touchend', moveEndHandler);
    },
  };
};
