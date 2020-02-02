import merge from 'lodash/fp/merge';
import set from 'lodash/fp/set';
import { createAction, createReducer } from 'redux-act';
import insertOrderBookUpdates from '../../utils/insertOrderBookUpdates';
import { exchangePairs } from '../../appConstant';
import { insertTotalAsks, insertTotalBids } from '../../utils/insertTotal';

import {
  InitialData,
  InitialExchange,
  ExchangeStore,
  PairAndExchange,
  SetSupportedComponents,
  SetOrderTypes,
  SetSupportedIntervals,
  SetWatchlist,
} from './types';

const initialData: InitialData = {
  trades: [],
  orderBook: {
    bids: [],
    asks: [],
  },
  price: 0,
  ispriceRising: true,
};

const initialExchange: InitialExchange = {
  markets: [],
  activeMarket: 'BTC',
  pairList: {},
  filteredPairsList: { watchlist: [] },
  supportedComponents: ['open', 'history', 'balance'],
  orderTypes: ['limit'],
  historyComponent: 'balance',
  activeOrderType: 'limit',
  supportedIntervals: ['1', '3', '5', '15', '30', '60', '120', '240', '1D', '1W', '1M'],
};

const exchangeData: { [exchange: string]: InitialExchange } = {};

Object.keys(exchangePairs).forEach((exchange: string) => {
  exchangeData[exchange] = {
    ...initialExchange,
    activePair: exchangePairs[exchange],
    data: {
      [exchangePairs[exchange]]: initialData,
    },
  };
});

const initialState: ExchangeStore = {
  exchange: 'binance',
  savedPairAndExchange: {},
  ...exchangeData,
};

export const setPairAndExchange = createAction<PairAndExchange>('exchange/setExchangeAndPair');
export const savePairAndExchange = createAction('exchange/setExchangeAndPair');

export const fetchExchangeConfig = createAction('exchange/fetchExchangeConfig');
export const setOrderTypes = createAction<SetOrderTypes>('exchange/setOrderTypes');
export const setActiveOrderType = createAction('exchange/setActiveOrderType');
export const setSupportedComponents = createAction<SetSupportedComponents>('exchange/setSupportedComponents');
export const setHistoryComponent = createAction<string>('exchange/setHistoryComponent');
export const setSupportedIntervals = createAction<SetSupportedIntervals>('core/setSupportedIntervals');

export const requestPairList = createAction('exchange/requestPairList');
export const setPairList = createAction<{ [pair: string]: any }>('exchange/setPairList');
export const setFilteredPairList = createAction<{ [key: string]: any }>('exchange/updatePairList');
export const setMarketList = createAction<string[]>('exchange/setMarketList');
export const setActiveMarket = createAction<string>('exchange/setActiveMarket');

export const toggleWatchlist = createAction<{ [key: string]: string }>('exchange/toggleWatchlist');
export const setWatchlist = createAction<SetWatchlist>('exchange/setWatchlist');

export const setPrice = createAction<number>('exchange/setPrice');
export const setIsPriceRising = createAction<boolean>('exchange/setIsPriceRising');
export const updateTrades = createAction<string[][]>('exchange/updateTrades');
export const setOrderBook = createAction<any>('exchange/setOrderBook');
export const updateOrderbook = createAction<any>('exchange/updateOrderbook');

const exchangeReducer = createReducer({}, initialState)
  .on(setPairAndExchange, (state, { exchange, pair }: PairAndExchange) => {
    let newState = state;

    if (!state[exchange].data[pair]) {
      newState = merge(state, {
        [exchange]: {
          data: {
            [pair]: initialData,
          },
        },
      });
    }

    newState = set('exchange', exchange, newState);
    newState = set([exchange, 'activePair'], pair, newState);
    return newState;
  })

  .on(savePairAndExchange, (state, { exchange, pair }: PairAndExchange) =>
    set('savedPairAndExchange', { exchange, pair }, state),
  )

  .on(setSupportedComponents, (state, { components, exchange }: SetSupportedComponents) =>
    set([exchange, 'supportedComponents'], components, state),
  )
  .on(setOrderTypes, (state, { orderTypes, exchange }: SetOrderTypes) =>
    set([exchange, 'orderTypes'], orderTypes, state),
  )
  .on(setSupportedIntervals, (state, { intervals, exchange }: SetSupportedIntervals) => {
    return set([exchange, 'supportedIntervals'], intervals, state);
  })
  .on(setHistoryComponent, (state, historyComponent: string) =>
    set([state.exchange, 'historyComponent'], historyComponent, state),
  )
  .on(setActiveOrderType, (state, activeOrderType: string) =>
    set([state.exchange, 'activeOrderType'], activeOrderType, state),
  )

  .on(setPairList, (state, pairList: { [pair: string]: any }) => set([state.exchange, 'pairList'], pairList, state))
  .on(setMarketList, (state, markets: string[]) => set([state.exchange, 'markets'], markets, state))
  .on(setActiveMarket, (state, activeMarket: string) => set([state.exchange, 'activeMarket'], activeMarket, state))
  .on(setFilteredPairList, (state, filteredList: { [key: string]: any }) => {
    const { watchlist } = state[state.exchange].filteredPairsList;

    return set(`${state.exchange}.filteredPairsList`, { ...filteredList, watchlist }, state);
  })

  .on(setWatchlist, (state, { exchange, watchlist }: SetWatchlist) => {
    return set(`${exchange}.filteredPairsList.watchlist`, watchlist, state);
  })
  .on(toggleWatchlist, (state, pairObj: { [key: string]: string }) => {
    const { watchlist } = state[state.exchange].filteredPairsList;

    if (watchlist.some((watchListPairObj: { [key: string]: string }) => watchListPairObj.symbol === pairObj.symbol)) {
      return set(
        `${state.exchange}.filteredPairsList.watchlist`,
        watchlist.filter((watchListPairObj: { [key: string]: string }) => watchListPairObj.symbol !== pairObj.symbol),
        state,
      );
    }

    return set(`${state.exchange}.filteredPairsList.watchlist`, [...watchlist, pairObj], state);
  })

  .on(setPrice, (state, price: number) =>
    set([state.exchange, 'data', state[state.exchange].activePair, 'price'], price, state),
  )

  .on(setIsPriceRising, (state, ispriceRising: boolean) =>
    set([state.exchange, 'data', state[state.exchange].activePair, 'ispriceRising'], ispriceRising, state),
  )

  .on(setOrderBook, (state, payload: any) => {
    payload.asks.reverse();

    const [asks, asksTotalBase, asksTotalQuote] = insertTotalAsks(payload.asks);
    const [bids, bidsTotalBase, bidsTotalQuote] = insertTotalBids(payload.bids);

    return set(
      [state.exchange, 'data', state[state.exchange].activePair, 'orderBook'],
      {
        asks,
        asksTotalBase,
        asksTotalQuote,
        bids,
        bidsTotalBase,
        bidsTotalQuote,
      },
      state,
    );
  })

  .on(updateTrades, (state, trades: string[][]) => {
    const pair = state[state.exchange].activePair;
    const oldTrades = state[state.exchange].data[pair].trades;

    let newTrades = [...trades, ...oldTrades]; // new first
    if (newTrades.length > 19) newTrades = newTrades.slice(0, 19); // delete last

    return set([state.exchange, 'data', pair, 'trades'], newTrades, state);
  })

  .on(updateOrderbook, (state, updates: any) => {
    const pair = state[state.exchange].activePair;
    const oldAsks = state[state.exchange].data[pair].orderBook.asks;
    const oldBids = state[state.exchange].data[pair].orderBook.bids;

    const newAsks = insertOrderBookUpdates(oldAsks, updates.asks);
    const newBids = insertOrderBookUpdates(oldBids, updates.bids);

    const [asks, asksTotalBase, asksTotalQuote] = insertTotalAsks(newAsks);
    const [bids, bidsTotalBase, bidsTotalQuote] = insertTotalBids(newBids);

    return set(
      [state.exchange, 'data', state[state.exchange].activePair, 'orderBook'],
      {
        asks,
        asksTotalBase,
        asksTotalQuote,
        bids,
        bidsTotalBase,
        bidsTotalQuote,
      },
      state,
    );
  });

export default exchangeReducer;
