import { take, put, call, all, fork, cancel, cancelled, delay } from 'redux-saga/effects';
import { EventChannel } from 'redux-saga';
import { OnDepthUpdateRes, OnTradeRes } from 'renderer/api/exchangesApi/types';
import API from '../../api';

import { updateTrades, updateOrderbook, setPrice, setOrderBook, setIsPriceRising } from './reducer';
import { setOrderBookIsLoading, setTradesIsLoading } from '../core/reducer';
import { PairAndExchange } from './types';

// prevent empty updates
const isEmpty = (updates: { asks: string[][]; bids: string[][] }) => !updates.asks.length && !updates.bids.length;

const createBatchTrades = (channel: EventChannel<OnTradeRes>) =>
  function* batchTrades() {
    const trades: OnTradeRes[] = [];

    try {
      while (true) {
        const data: OnTradeRes = yield take(channel);
        trades.unshift(data);
      }
    } finally {
      if (yield cancelled() && trades.length) {
        // this block syncs data for chart
        // inits in tvChartContainer/api/updater
        // will throw some errors before inits (so needs ?.)
        // eslint-disable-next-line no-unused-expressions
        window.updateChartPrice?.(trades[0].price);

        yield put(setPrice(trades[0].price));
        yield put(setIsPriceRising(trades[0].side === 'sell'));
        yield put(setTradesIsLoading(false));
        yield put(updateTrades(trades));
      }
    }
  };

const createBatchOrderbook = (channel: EventChannel<OnDepthUpdateRes>) =>
  function* batchOrderbook() {
    let updates = { asks: [], bids: [] };

    try {
      while (true) {
        const data = yield take(channel);
        if (data.type === 'snapshot') {
          yield put(setOrderBook(data));
          yield put(setOrderBookIsLoading(false));
        }

        const asks = updates.asks.concat(data.asks);
        const bids = updates.bids.concat(data.bids);
        updates = { asks, bids };
      }
    } finally {
      if (yield cancelled() && !isEmpty(updates)) {
        yield put(updateOrderbook(updates));
      }
    }
  };

const createBgWorker = (timer: number, task: () => void) =>
  function* bgWorker() {
    while (true) {
      // starts the task in the background
      const forkedTask = yield fork(task);
      // waits for delay
      yield delay(timer);
      // cancels task and triggers finally
      yield cancel(forkedTask);
    }
  };

export default (pairAndExchange: PairAndExchange) => {
  return function* createWatchers() {
    const tradesChannel: EventChannel<OnTradeRes> = yield call(API.public.tradesChannel, pairAndExchange);
    const orderbookChannel: EventChannel<OnDepthUpdateRes> = yield call(API.public.orderbookChannel, pairAndExchange);

    yield all([
      fork(createBgWorker(1000, createBatchTrades(tradesChannel))),
      fork(createBgWorker(1000, createBatchOrderbook(orderbookChannel))),
    ]);
  };
};
