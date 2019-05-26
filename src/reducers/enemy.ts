import { Reducer } from 'redux';
import * as ActionType from '../actions/enemyConstants';
import { EnemyAction } from '../actions/enemy';

export interface Enemy {
  id: number;
  x: number;
  y: number;
}

export interface EnemyState {
  enemies: Enemy[];
}

const initialState: EnemyState = {
  enemies: [],
};

const enemyReducer: Reducer<EnemyState, EnemyAction> = (
  state: EnemyState = initialState,
  action: EnemyAction,
) => {
  switch (action.type) {
    case ActionType.PREPARE_ENEMY:
      return state;
    case ActionType.GENERATE:
      return {
        ...state,
        enemies: state.enemies.concat(action.payload.params),
      };
    case ActionType.UPDATE_ENEMIES:
      return {
        ...state,
        enemies: action.payload.params.enemies,
      };
    case ActionType.DELETE:
      return state;
    case ActionType.CLEAR:
      return initialState;
    default: {
      /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
      const _: never = action;

      return state;
    }
  }
};

export default enemyReducer;
