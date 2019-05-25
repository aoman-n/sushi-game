import { fork, put, all, takeLeading, select, delay } from 'redux-saga/effects';
import * as Actions from '../actions/keyboardConstants';
import { update } from '../actions/plaryer';
import { playerSize } from '../config';

const velocity = 5;

function* updateWorker() {
  while (true) {
    const { keyboard, player } = yield select(state => state);
    let { x, y }: { x: number; y: number } = player;

    if (!keyboard.up && !keyboard.down && !keyboard.left && !keyboard.right)
      break;

    if (keyboard.up && y > 0) y -= velocity;
    if (keyboard.down && y < 400 - playerSize) y += velocity;
    if (keyboard.left && x > 0) x -= velocity;
    if (keyboard.right && x < 700 - playerSize) x += velocity;

    yield put(update({ x, y }));
    yield delay(1000 / 60);
  }
}

function* keyboardWatcher() {
  yield takeLeading(
    [
      Actions.DOWN_START,
      Actions.LEFT_START,
      Actions.RIGHT_START,
      Actions.UP_START,
    ],
    updateWorker,
  );
}

export default function* rootSaga() {
  yield all([fork(keyboardWatcher)]);
}
