import { fork, put, takeLeading, take } from 'redux-saga/effects';
import * as Actions from '../actions/appConstants';
/* ActionCreator */
import { clearEnemy } from '../actions/enemy';
import { clear as clearPlayer } from '../actions/plaryer';
/* Sagas */
import { updatePlayerWorker } from './player';
import { generateEnemyWorker, updateEnemyWorker } from './enemy';

function* startGameWatcher() {
  yield takeLeading(Actions.START_GAME, updatePlayerWorker);
  yield takeLeading(Actions.START_GAME, generateEnemyWorker);
  yield takeLeading(Actions.START_GAME, updateEnemyWorker);
}

function* finishGameWatcher() {
  while (true) {
    yield take(Actions.FINISH_GAME);
    yield put(clearEnemy());
    yield put(clearPlayer());
  }
}

export default function* rootSaga() {
  yield fork(startGameWatcher);
  yield fork(finishGameWatcher);
}
