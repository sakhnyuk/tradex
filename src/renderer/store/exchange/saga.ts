/* eslint-disable no-continue */
/* eslint-disable max-len */
import { take, put, call, fork, cancel, takeLatest, takeEvery, select, delay } from 'redux-saga/effects';

import {
  requestPairList,
  setPairList,
  setPairAndExchange,
  setFilteredPairList,
  setMarketList,
  setOrderTypes,
  setSupportedComponents,
  setActiveOrderType,
  setHistoryComponent,
  setSupportedIntervals,
} from './reducer';

import createWatchers from './createWatchersSaga';
import Logger from '../../utils/logger';
import API from '../../api';
import { selectPairAndExchange, selectExchange, selectActivePair } from './selectors';
import { setOnline, setOrderBookIsLoading, setTradesIsLoading } from '../core/reducer';
import { Exchange } from '../../appConstant';

function* resubscribeSaga() {
  const defaultPairAndExchange = yield select(selectPairAndExchange);

  let webcaWatchers = yield fork(createWatchers(defaultPairAndExchange));
  while (true) {
    // Catch changing Exchange or Pair and recreate
    // trade and orderbook watchers
    const { payload } = yield take(setPairAndExchange);

    if (webcaWatchers) yield cancel(webcaWatchers);
    webcaWatchers = yield fork(createWatchers(payload));
  }
}

function* pairListSaga({ payload: exchange }: any) {
  try {
    const [marketList, fullList] = yield call(API.public.fetchPairList, exchange);
    const markets = Object.keys(marketList);
    markets.push('watchlist');

    Object.keys(marketList).forEach(market => marketList[market].sort((a: any, b: any) => b.volume - a.volume));

    yield put(setPairList(fullList));
    yield put(setFilteredPairList(marketList));
    yield put(setMarketList(markets));
  } catch (error) {
    Logger.error(error, '40');
  }
}

function* pairWorker() {
  while (true) {
    yield delay(60000);
    const exchange = yield select(selectExchange);
    yield call(pairListSaga, { payload: exchange });
  }
}

function* setLoadersSaga() {
  yield put(setOrderBookIsLoading(true));
  yield put(setTradesIsLoading(true));
}

// test if exactly you can make request and not catch ERR_NETWORK_CHANGED
function* testNetworkSaga() {
  while (true) {
    const { status } = yield call(() => fetch('https://www.google.com/'));
    if (status < 400) break;
  }
}

function* onlineWatcher() {
  let resubscribeTask;

  while (true) {
    const { payload: isOnline } = yield take(setOnline);

    if (isOnline) {
      yield call(testNetworkSaga);

      if (resubscribeTask) yield cancel(resubscribeTask);
      resubscribeTask = yield fork(resubscribeSaga);

      const exchange = yield select(selectExchange);
      yield call(pairListSaga, { payload: exchange });
    } else if (resubscribeTask) {
      yield cancel(resubscribeTask);
    }
  }
}

function* setConfigSaga(config: any, exchange: Exchange) {
  yield put(setOrderTypes({ orderTypes: config.orderTypes, exchange }));
  yield put(setActiveOrderType(config.orderTypes[0]));
  yield put(setSupportedComponents({ components: config.componentList, exchange }));
  yield put(setHistoryComponent(config.componentList[0]));
}

function* exchangeConfigSaga() {
  // fill state on start (prevent bugs)
  const startExchange = yield select(selectExchange);
  try {
    const { exchange: normal, margin, intervals } = yield call(API.public.fetchExchangeConfig, startExchange);
    yield put(setSupportedIntervals({ exchange: startExchange, intervals }));

    if (margin.isActive) {
      yield setConfigSaga(margin, startExchange);
    } else {
      yield setConfigSaga(normal, startExchange);
    }
  } catch (error) {
    Logger.error(error, '41');
  }

  // start worker
  while (true) {
    const oldExchange = yield select(selectExchange);
    const {
      payload: { exchange },
    } = yield take(setPairAndExchange);

    if (oldExchange === exchange) {
      continue;
    }

    try {
      const { exchange: normal, margin, intervals } = yield call(API.public.fetchExchangeConfig, exchange);
      yield put(setSupportedIntervals({ exchange, intervals }));

      if (margin.isActive) {
        yield setConfigSaga(margin, exchange);
        continue;
      }

      yield setConfigSaga(normal, exchange);
    } catch (error) {
      Logger.error(error, '42');
    }
  }
}

export default function*() {
  yield takeEvery(setPairAndExchange, setLoadersSaga);
  yield fork(exchangeConfigSaga);
  yield takeLatest(requestPairList, pairListSaga);
  yield fork(onlineWatcher);
  yield fork(pairWorker);
}
