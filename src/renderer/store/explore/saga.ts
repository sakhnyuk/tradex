import { put, takeEvery } from 'redux-saga/effects';
import { Action } from 'redux-act';

import { setExplorePairAndExchange } from './reducer';
import { setPairAndExchange } from '../exchange/reducer';
import { SetExplorePairAndExchange } from './types';

// Settings explore exchange and pair to target store for update
// watchers and data fetchers
function* setTargetPairAndExchangesSaga({ payload }: Action<SetExplorePairAndExchange>) {
  yield put(setPairAndExchange(payload));
}

export default function*() {
  yield takeEvery(setExplorePairAndExchange, setTargetPairAndExchangesSaga);
}
