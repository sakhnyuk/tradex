import { fork, all } from 'redux-saga/effects';

import core from './core/saga';
import exchange from './exchange/saga';
import explore from './explore/saga';

export default function* rootSaga() {
  yield all([fork(core), fork(exchange), fork(explore)]);
}
