import { Reducer } from 'redux';
import * as ActionType from 'actions/keyboardConstants';
import { KeyboardAction } from 'actions/keyboard';

export interface KeyboardState {
  left: boolean;
  right: boolean;
  up: boolean;
  down: boolean;
  z: boolean;
}

const initialState: KeyboardState = {
  left: false,
  right: false,
  up: false,
  down: false,
  z: false,
};

const keyboardReducer: Reducer<KeyboardState, KeyboardAction> = (
  state: KeyboardState = initialState,
  action: KeyboardAction,
) => {
  switch (action.type) {
    case ActionType.UP_START:
      return { ...state, up: true };
    case ActionType.UP_STOP:
      return { ...state, up: false };
    case ActionType.LEFT_START:
      return { ...state, left: true };
    case ActionType.LEFT_STOP:
      return { ...state, left: false };
    case ActionType.DOWN_START:
      return { ...state, down: true };
    case ActionType.DOWN_STOP:
      return { ...state, down: false };
    case ActionType.RIGHT_START:
      return { ...state, right: true };
    case ActionType.RIGHT_STOP:
      return { ...state, right: false };
    default: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const _: never = action;

      return state;
    }
  }
};

export default keyboardReducer;
