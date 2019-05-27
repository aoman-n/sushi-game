import {
  fork,
  put,
  delay,
  takeLeading,
  select,
  throttle,
} from 'redux-saga/effects';
import * as Actions from '../actions/playerBulletConstants';
import { generate, updateBullets } from '../actions/playerBullet';
import { Bullet } from '../reducers/playerBullet';
import { checkInFrame } from '../utils';

const VELOCITY = 10;
const COOL_TIME = 800;
let playerBulletId = 1;

function* updateWorker() {
  while (true) {
    yield delay(1000 / 30);
    const { bullets } = yield select(state => state.playerBullet);
    if (bullets.length === 0) break;
    const updatedBullets = bullets.map((bullet: Bullet) => {
      const newBullet = bullet;
      newBullet.x += VELOCITY;

      return newBullet;
    });
    const deletedBullets = updatedBullets.filter((bullet: Bullet) =>
      checkInFrame(bullet),
    );
    yield put(updateBullets({ bullets: deletedBullets }));
  }
}

function* prepareBullet() {
  const { x, y } = yield select(state => state.player);
  playerBulletId += 1;
  yield put(generate({ id: playerBulletId, x, y }));
}

function* prepareBulletWatcher() {
  yield throttle(COOL_TIME, Actions.PREPARE_BULLET, prepareBullet);
}

function* generatePalyerBulletWatcher() {
  yield takeLeading(Actions.GENERATE, updateWorker);
}

export default function* rootSaga() {
  yield fork(generatePalyerBulletWatcher);
  yield fork(prepareBulletWatcher);
}
