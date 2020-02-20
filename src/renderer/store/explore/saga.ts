import { put, takeEvery } from 'redux-saga/effects';

import { setExplorePairAndExchange } from './reducer';
import { setPairAndExchange } from '../exchange/reducer';

// Settings explore exchange and pair to target store for update
// watchers and data fetchers
function* setTargetPairAndExchangesSaga({ payload }) {
  yield put(setPairAndExchange(payload));
}

export default function*() {
  yield takeEvery(setExplorePairAndExchange, setTargetPairAndExchangesSaga);
}
