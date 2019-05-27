import * as ActionType from './appConstants';

export const startGame = () => ({
  type: ActionType.START_GAME as typeof ActionType.START_GAME,
});

export const finishGame = () => ({
  type: ActionType.FINISH_GAME as typeof ActionType.FINISH_GAME,
});

export const incrementLevel = () => ({
  type: ActionType.INCREMENT_LEVEL as typeof ActionType.INCREMENT_LEVEL,
});

export const updateKillCount = (params: { killCount: number }) => ({
  type: ActionType.UPDATE_KILL_COUNT as typeof ActionType.UPDATE_KILL_COUNT,
  payload: { params },
});

export type AppAction =
  | ReturnType<typeof startGame>
  | ReturnType<typeof finishGame>
  | ReturnType<typeof incrementLevel>
  | ReturnType<typeof updateKillCount>;
