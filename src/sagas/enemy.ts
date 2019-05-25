import { fork, put, delay, select } from 'redux-saga/effects';
import { generateEnemy, updateEnemies } from '../actions/enemy';
import { Enemy } from '../reducers/enemy';
import { checkInFrame, randRange } from '../utils';

const velocity = 5;
let enemyId = 1;

function* updateWorker() {
  while (true) {
    yield delay(40);
    const { enemies } = yield select(state => state.enemy);
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
    yield put(
      generateEnemy({
        id: enemyId,
        x: 670,
        y: randRange(30, 370),
      }),
    );
    enemyId += 1;
    yield delay(5000);
  }
}

export default function* rootSaga() {
  yield fork(generateWorker);
  yield fork(updateWorker);
}
