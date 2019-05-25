import * as ActionType from './playerBulletConstants';

export interface GenerateParams {
  id: number;
  x: number;
  y: number;
}

interface UpdatePrams {
  id: number;
  x: number;
  y: number;
}

export const prepareBullet = () => ({
  type: ActionType.PREPARE_BULLET as typeof ActionType.PREPARE_BULLET,
});

export const generate = (params: GenerateParams) => ({
  type: ActionType.GENERATE as typeof ActionType.GENERATE,
  payload: { params },
});

export const update = (params: UpdatePrams) => ({
  type: ActionType.UPDATE as typeof ActionType.UPDATE,
  payload: { params },
});

export const deleteBullet = (params: { id: number }) => ({
  type: ActionType.DELETE as typeof ActionType.DELETE,
  payload: { params },
});

export type PlayerBulletAction =
  | ReturnType<typeof prepareBullet>
  | ReturnType<typeof generate>
  | ReturnType<typeof update>
  | ReturnType<typeof deleteBullet>;
