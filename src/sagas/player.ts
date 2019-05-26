import { put, select, delay } from 'redux-saga/effects';
import { finishGame } from '../actions/app';
import { update } from '../actions/plaryer';
import { Enemy } from '../reducers/enemy';
import { playerSize, enemySize } from '../config';

const velocity = 5;

export function* updatePlayerWorker() {
  while (true) {
    const {
      keyboard,
      player,
      app,
      enemy: { enemies },
    } = yield select(state => state);
    if (!app.isPlaying) break;

    let { x, y }: { x: number; y: number } = player;
    const isHit = enemies.some((enemy: Enemy) => {
      return (
        /* TODO: 当たり判定の条件式をutil化する */
        ((x >= enemy.x && x <= enemy.x + enemySize) ||
          (x + playerSize >= enemy.x &&
            x + playerSize < enemy.x + enemySize)) &&
        ((y >= enemy.y && y <= enemy.y + enemySize) ||
          (y + playerSize >= enemy.y && y + playerSize <= enemy.y + enemySize))
      );
    });
    if (isHit) yield put(finishGame());

    if (keyboard.up && y > 0) y -= velocity;
    if (keyboard.down && y < 400 - playerSize) y += velocity;
    if (keyboard.left && x > 0) x -= velocity;
    if (keyboard.right && x < 700 - playerSize) x += velocity;

    yield put(update({ x, y }));
    yield delay(1000 / 60);
  }
}
