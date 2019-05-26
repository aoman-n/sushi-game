import {
  fork,
  put,
  takeLeading,
  take,
  select,
  delay,
} from 'redux-saga/effects';
import * as Actions from '../actions/appConstants';
import { finishGame } from '../actions/app';
import { clearEnemy } from '../actions/enemy';
import { update, clear as clearPlayer } from '../actions/plaryer';
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

function* gameFinishWatcher() {
  while (true) {
    yield take(Actions.FINISH_GAME);
    yield put(clearEnemy());
    yield put(clearPlayer());
  }
}

export default function* rootSaga() {
  yield fork(gameStartWatcher);
  yield fork(gameFinishWatcher);
}
