import { Reducer } from 'redux';
import * as ActionType from 'actions/playerConstants';
import { PlayerAction } from 'actions/plaryer';

export interface PlayerState {
  x: number;
  y: number;
}

const initialState: PlayerState = {
  x: 50,
  y: 200,
};

const keyboardReducer: Reducer<PlayerState, PlayerAction> = (
  state: PlayerState = initialState,
  action: PlayerAction,
) => {
  switch (action.type) {
    case ActionType.UPDATE: {
      const { x, y } = action.payload.params;

      return { ...state, x, y };
    }
    case ActionType.CLEAR:
      return initialState;
    default: {
      /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
      const _: never = action;

      return state;
    }
  }
};

export default keyboardReducer;
