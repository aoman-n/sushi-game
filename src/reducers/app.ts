import { Reducer } from 'redux';
import * as ActionType from '../actions/appConstants';
import { AppAction } from '../actions/app';

export enum LayoutType {
  TITLE_SCREEN = 'TITLE_SCREEN',
  GAME_SCREEN = 'GAME_SCREEN',
  FINISH_SCREEN = 'FINISH_SCREEN',
}

export interface AppState {
  layout: LayoutType;
  isPlaying: boolean;
}

const initialState: AppState = {
  layout: LayoutType.TITLE_SCREEN,
  isPlaying: false,
};

const appReducer: Reducer<AppState, AppAction> = (
  state: AppState = initialState,
  action: AppAction,
) => {
  switch (action.type) {
    case ActionType.START_GAME:
      return {
        ...state,
        layout: LayoutType.GAME_SCREEN,
        isPlaying: true,
      };
    case ActionType.FINISH_GAME:
      return {
        ...state,
        layout: LayoutType.FINISH_SCREEN,
        isPlaying: false,
      };
    default: {
      /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
      const _: never = action;

      return state;
    }
  }
};

export default appReducer;
