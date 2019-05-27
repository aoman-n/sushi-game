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
  level: number;
  killCount: number;
}

const initialState: AppState = {
  layout: LayoutType.TITLE_SCREEN,
  isPlaying: false,
  level: 1,
  killCount: 0,
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
        level: 1,
        killCount: 0,
      };
    case ActionType.FINISH_GAME:
      return {
        ...state,
        layout: LayoutType.FINISH_SCREEN,
        isPlaying: false,
      };
    case ActionType.INCREMENT_LEVEL:
      return {
        ...state,
        level: state.level + 1,
      };
    case ActionType.UPDATE_KILL_COUNT:
      return {
        ...state,
        killCount: state.killCount + action.payload.params.killCount,
      };
    default: {
      /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
      const _: never = action;

      return state;
    }
  }
};

export default appReducer;
