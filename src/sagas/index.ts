import { fork } from 'redux-saga/effects';
import keyboard from './keyboard';

export default function* rootSaga() {
  yield fork(keyboard);
}
