import { fork } from 'redux-saga/effects';
import app from './app';
import playerBullet from './playerBullet';

export default function* rootSaga() {
  yield fork(app);
  yield fork(playerBullet);
}
