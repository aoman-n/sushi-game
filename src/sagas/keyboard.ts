import {
  fork,
  put,
  all,
  take,
  select,
  cancel,
  delay,
} from 'redux-saga/effects';
import * as Actions from '../actions/keyboardConstants';
import { update } from '../actions/plaryer';

const velocity = 5;

function* increment() {
  while (true) {
    const { keyboard, player } = yield select(state => state);
    let { x, y }: { x: number; y: number } = player;

    if (keyboard.up && y >= 0) y -= velocity;
    if (keyboard.down && y < 360) y += velocity;
    if (keyboard.left && x > 0) x -= velocity;
    if (keyboard.right && x < 660) x += velocity;

    yield put(update({ x, y }));
    yield delay(1000 / 60);
  }
}

function* startMove() {
  const task = yield fork(increment);
  yield take([
    Actions.DOWN_STOP,
    Actions.LEFT_STOP,
    Actions.RIGHT_STOP,
    Actions.UP_STOP,
  ]);
  yield cancel(task);
  yield fork(keyboardWatcher);
}

function* keyboardWatcher(): any {
  yield take([
    Actions.DOWN_START,
    Actions.LEFT_START,
    Actions.RIGHT_START,
    Actions.UP_START,
  ]);
  yield fork(startMove);
}

export default function* rootSaga() {
  yield all([fork(keyboardWatcher)]);
}
