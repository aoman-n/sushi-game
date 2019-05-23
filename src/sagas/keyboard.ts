import {
  fork,
  put,
  all,
  call,
  take,
  select,
  cancel,
  takeEvery,
} from 'redux-saga/effects';
import * as Actions from '../actions/keyboardConstants';
import { update } from '../actions/plaryer';
// import {  } from '../actions/keyboard';

// function* runGetMembers(action: ReturnType<typeof getMembers.start>) {
//   const { organizationName } = action.payload.params;
//   const api = getMembersFactory();

//   try {
//     const users = yield call(api, organizationName);
//     yield put(getMembers.succeed({ organizationName }, { users }));
//   } catch (error) {
//     yield put(getMembers.fail({ organizationName }, error));
//   }
// }

const velocity = 5;

// function* increment(keyboard: any, player: any) {
// setInterval(() => {
//   let { x, y } = player;
//   if (keyboard.up) y -= velocity;
//   if (keyboard.down) y += velocity;
//   if (keyboard.left) x -= velocity;
//   if (keyboard.right) x += velocity;
// }, 400);
// yield put(update({ x, y }));
// const runner = yield call(
//   setInterval,
//   () => {
//     if (keyboard.up) y -= velocity;
//     if (keyboard.down) y += velocity;
//     if (keyboard.left) x -= velocity;
//     if (keyboard.right) x += velocity;
//     yield put(update({ x, y }));
//   },
//   400,
// );
// }

function* startMove() {
  const { keyboard, player } = yield select(state => state);
  let { x, y } = player;
  if (keyboard.up) y -= velocity;
  if (keyboard.down) y += velocity;
  if (keyboard.left) x -= velocity;
  if (keyboard.right) x += velocity;
  yield put(update({ x, y }));
  // const task = yield fork(increment, keyboard, player);
  // yield take([
  //   Actions.DOWN_STOP,
  //   Actions.LEFT_STOP,
  //   Actions.RIGHT_STOP,
  //   Actions.UP_STOP,
  // ]);
  // yield cancel(task);
}

function* keyboardWatcher() {
  const action = yield takeEvery(
    [
      Actions.DOWN_START,
      Actions.LEFT_START,
      Actions.RIGHT_START,
      Actions.UP_START,
    ],
    startMove,
  );
  // yield fork(startMove);
}

export default function* rootSaga() {
  yield all([fork(keyboardWatcher)]);
}
