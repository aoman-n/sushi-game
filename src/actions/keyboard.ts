import * as ActionType from './keyboardConstants';

export const upStart = () => ({
  type: ActionType.UP_START as typeof ActionType.UP_START,
});

export const upStop = () => ({
  type: ActionType.UP_STOP as typeof ActionType.UP_STOP,
});

export const leftStart = () => ({
  type: ActionType.LEFT_START as typeof ActionType.LEFT_START,
});

export const leftStop = () => ({
  type: ActionType.LEFT_STOP as typeof ActionType.LEFT_STOP,
});

export const downStart = () => ({
  type: ActionType.DOWN_START as typeof ActionType.DOWN_START,
});

export const downStop = () => ({
  type: ActionType.DOWN_STOP as typeof ActionType.DOWN_STOP,
});

export const rightStart = () => ({
  type: ActionType.RIGHT_START as typeof ActionType.RIGHT_START,
});

export const rightStop = () => ({
  type: ActionType.RIGHT_STOP as typeof ActionType.RIGHT_STOP,
});

export type KeyboardAction =
  | ReturnType<typeof upStart>
  | ReturnType<typeof upStop>
  | ReturnType<typeof leftStart>
  | ReturnType<typeof leftStop>
  | ReturnType<typeof downStart>
  | ReturnType<typeof downStop>
  | ReturnType<typeof rightStart>
  | ReturnType<typeof rightStop>;
