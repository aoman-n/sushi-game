import { put, delay, select } from 'redux-saga/effects';
import { generateEnemy, updateEnemies } from '../actions/enemy';
import { Enemy } from '../reducers/enemy';
import { checkInFrame, randRange } from '../utils';
import { enemySize } from '../config';

const velocity = 5;
const coolTimeMsec = 5000;
let enemyId = 1;

export function* updateEnemyWorker() {
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

export function* generateEnemyWorker() {
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
