import {
  fork,
  put,
  takeLeading,
  take,
  delay,
  select,
} from 'redux-saga/effects';
import * as Actions from '../actions/appConstants';
/* ActionCreator */
import { incrementLevel } from '../actions/app';
import { clearEnemy } from '../actions/enemy';
import { clear as clearPlayer } from '../actions/plaryer';
/* Sagas */
import { updatePlayerWorker } from './player';
import { generateEnemyWorker, updateEnemyWorker } from './enemy';

const LEVEL_UP_INTERVAL = 10000;

function* incrementLevelWorker() {
  while (true) {
    const { isPlaying } = yield select(state => state.app);
    if (!isPlaying) break;
    yield delay(LEVEL_UP_INTERVAL);
    yield put(incrementLevel());
  }
}

function* startGameWatcher() {
  yield takeLeading(Actions.START_GAME, updatePlayerWorker);
  yield takeLeading(Actions.START_GAME, generateEnemyWorker);
  yield takeLeading(Actions.START_GAME, updateEnemyWorker);
  yield takeLeading(Actions.START_GAME, incrementLevelWorker);
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
