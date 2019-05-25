import * as ActionType from './appConstants';

export const startGame = () => ({
  type: ActionType.START_GAME as typeof ActionType.START_GAME,
});

export const finishGame = () => ({
  type: ActionType.FINISH_GAME as typeof ActionType.FINISH_GAME,
});

export type AppAction =
  | ReturnType<typeof startGame>
  | ReturnType<typeof finishGame>;
