import { all, fork, put, delay, takeEvery } from 'redux-saga/effects';
import * as ActionType from '../actions/playerBulletConstants';
import { generate, update, deleteBullet } from '../actions/playerBullet';

function* movePlayerBullet(action: ReturnType<typeof generate>) {
  const { id, x, y } = action.payload.params;
  let newBullet: { id: number; x: number; y: number };
  while (true) {
    yield delay(100);
    newBullet = { id, x: x + 1, y };
    if (
      newBullet.x > 700 ||
      newBullet.x < 0 ||
      newBullet.y > 400 ||
      newBullet.y < 0
    ) {
      yield put(deleteBullet({ id }));
      break;
    }
    yield put(update(newBullet));
  }
}

function* generatePalyerBulletWatcher() {
  yield takeEvery(ActionType.GENERATE, movePlayerBullet);
}

export default function* rootSaga() {
  yield all([fork(generatePalyerBulletWatcher)]);
}
