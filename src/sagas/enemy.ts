import { fork, put, delay, select, takeLeading } from 'redux-saga/effects';
import { generateEnemy, updateEnemies } from '../actions/enemy';
import * as Actions from '../actions/appConstants';
import { Enemy } from '../reducers/enemy';
import { checkInFrame, randRange } from '../utils';
import { enemySize } from '../config';

const velocity = 5;
const coolTimeMsec = 5000;
let enemyId = 1;

function* updateWorker() {
  while (true) {
    yield delay(1000 / 30);
    const {
      app,
      enemy: { enemies },
    } = yield select(state => state);
    if (!app.isPlaying) break;
    const updatedEnemies = enemies.map((enemy: Enemy) => {
      const newEnemy = enemy;
      newEnemy.x -= velocity;

      return newEnemy;
    });
    const deletedEnemies = updatedEnemies.filter((enemy: Enemy) =>
      checkInFrame(enemy),
    );
    yield put(updateEnemies({ enemies: deletedEnemies }));
  }
}

function* generateWorker() {
  while (true) {
    const { app } = yield select(state => state);
    if (!app.isPlaying) break;
    yield put(
      generateEnemy({
        id: enemyId,
        x: 700 - enemySize,
        y: randRange(0, 400 - enemySize),
      }),
    );
    enemyId += 1;
    yield delay(coolTimeMsec);
  }
}

function* startGameWatcher() {
  yield takeLeading(Actions.START_GAME, generateWorker);
  yield takeLeading(Actions.START_GAME, updateWorker);
}

export default function* rootSaga() {
  yield fork(startGameWatcher);
}
