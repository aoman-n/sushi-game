import { fork, put, takeLeading, select, delay } from 'redux-saga/effects';
import * as Actions from '../actions/appConstants';
import { finishGame } from '../actions/app';
import { update } from '../actions/plaryer';
import { Enemy } from '../reducers/enemy';
import { playerSize } from '../config';

const velocity = 5;

function* updateWorker() {
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
        x < enemy.x &&
        enemy.x < x + playerSize &&
        y < enemy.y &&
        enemy.y < y + playerSize
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

function* gameStartWatcher() {
  yield takeLeading(Actions.START_GAME, updateWorker);
}

export default function* rootSaga() {
  yield fork(gameStartWatcher);
}
