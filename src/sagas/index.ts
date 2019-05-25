import { fork } from 'redux-saga/effects';
import keyboard from './keyboard';
import playerBullet from './playerBullet';
import enemy from './enemy';

export default function* rootSaga() {
  yield fork(keyboard);
  yield fork(playerBullet);
  yield fork(enemy);
}
