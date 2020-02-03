import { fork, all } from 'redux-saga/effects';

import core from './core/saga';
import exchange from './exchange/saga';

export default function* rootSaga() {
  yield all([fork(core), fork(exchange)]);
}
