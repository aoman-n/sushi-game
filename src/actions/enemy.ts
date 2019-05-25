import * as ActionType from './enemyConstants';
import { Enemy } from '../reducers/enemy';

interface UpdateEnemiesParams {
  enemies: Enemy[];
}

// 必要なさそう
export const prepareEnemy = () => ({
  type: ActionType.PREPARE_ENEMY as typeof ActionType.PREPARE_ENEMY,
});

export const generateEnemy = (params: Enemy) => ({
  type: ActionType.GENERATE as typeof ActionType.GENERATE,
  payload: { params },
});

export const updateEnemies = (params: UpdateEnemiesParams) => ({
  type: ActionType.UPDATE_ENEMIES as typeof ActionType.UPDATE_ENEMIES,
  payload: { params },
});

// 必要なさそう
export const deleteEnemy = (params: { id: number }) => ({
  type: ActionType.DELETE as typeof ActionType.DELETE,
  payload: { params },
});

export type EnemyAction =
  | ReturnType<typeof prepareEnemy>
  | ReturnType<typeof updateEnemies>
  | ReturnType<typeof generateEnemy>
  | ReturnType<typeof deleteEnemy>;
