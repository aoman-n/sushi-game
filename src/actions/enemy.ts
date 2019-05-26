import * as ActionType from './enemyConstants';
import { Enemy } from '../reducers/enemy';

interface UpdateEnemiesParams {
  enemies: Enemy[];
}

export const generateEnemy = (params: Enemy) => ({
  type: ActionType.GENERATE as typeof ActionType.GENERATE,
  payload: { params },
});

export const updateEnemies = (params: UpdateEnemiesParams) => ({
  type: ActionType.UPDATE_ENEMIES as typeof ActionType.UPDATE_ENEMIES,
  payload: { params },
});

// export const deleteEnemy = (params: { id: number }) => ({
//   type: ActionType.DELETE as typeof ActionType.DELETE,
//   payload: { params },
// });

export const clearEnemy = () => ({
  type: ActionType.CLEAR as typeof ActionType.CLEAR,
});

export type EnemyAction =
  | ReturnType<typeof updateEnemies>
  | ReturnType<typeof generateEnemy>
  // | ReturnType<typeof deleteEnemy>
  | ReturnType<typeof clearEnemy>;
