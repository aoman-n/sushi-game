import * as ActionType from './playerConstants';
import { PlayerState } from '../reducers/player';

export const update = (params: PlayerState) => ({
  type: ActionType.UPDATE as typeof ActionType.UPDATE,
  payload: { params },
});

export const clear = () => ({
  type: ActionType.CLEAR as typeof ActionType.CLEAR,
});

export type PlayerAction = ReturnType<typeof update> | ReturnType<typeof clear>;
