import * as ActionType from './playerConstants';
import { PlayerState } from '../reducers/player';

export const update = (params: PlayerState) => ({
  type: ActionType.UPDATE as typeof ActionType.UPDATE,
  payload: { params },
});

export type PlayerAction = ReturnType<typeof update>;
