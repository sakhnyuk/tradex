/* eslint-disable max-len */
import { createSelector } from 'reselect';
import { formatPrice } from '../../utils/setFormatPrice';
import { selectCore } from '../core/selectors';

import { Store } from '../types';
import { PairObj, GroupedIntervals } from './types';

const activeExchange = (state: Store) => state.exchange[state.exchange.exchange];
const activePair = (state: Store) => activeExchange(state).activePair;

export const selectExchange = (state: Store) => state.exchange.exchange;

export const selectPairAndExchange = createSelector(activeExchange, activePair, (exchange, pair) => ({
  exchange,
  pair,
}));

export const selectMarkets = (state: Store) => activeExchange(state).markets;
export const selectActiveMarket = (state: Store) => activeExchange(state).activeMarket;

export const selectOrderTypes = (state: Store) => activeExchange(state).orderTypes;
export const selectActiveOrderType = (state: Store) => activeExchange(state).activeOrderType;

export const selectSupportedComponents = (state: Store) => activeExchange(state).supportedComponents;
export const selectHistoryComponent = (state: Store) => activeExchange(state).historyComponent;
export const selectSupportedIntervals = createSelector(
  (state: Store) => activeExchange(state).supportedIntervals,
  intervals => {
    const groupedIntervals: GroupedIntervals = { minutes: [], hours: [], days: [] };

    intervals.forEach((interval: number) => {
      if (interval < 60) {
        groupedIntervals.minutes.push(interval);
      } else if (interval >= 60 && interval < 1440) {
        groupedIntervals.hours.push(interval);
      } else {
        groupedIntervals.days.push(interval);
      }
    });

    return groupedIntervals;
  },
);

export const selectPairList = (state: Store) => activeExchange(state).pairList;
export const selectRawPairList = (state: Store) => activeExchange(state).filteredPairsList;
export const selectFilteredPairList = createSelector(
  selectCore.pairListSorting,
  selectRawPairList,
  (sortBy, pairList) => {
    const newPairList: { [key: string]: PairObj } = {};

    const sortTable = {
      Volume: (a: PairObj, b: PairObj) => a.volume - b.volume,
      VolumeDescending: (a: PairObj, b: PairObj) => b.volume - a.volume,
      Price: (a: PairObj, b: PairObj) => a.price - b.price,
      PriceDescending: (a: PairObj, b: PairObj) => b.price - a.price,
      Name: (a: PairObj, b: PairObj) => {
        if (a.symbol < b.symbol) {
          return -1;
        }
        if (a.symbol > b.symbol) {
          return 1;
        }
        return 0;
      },
      NameDescending: (a: PairObj, b: PairObj) => {
        if (b.symbol < a.symbol) {
          return -1;
        }
        if (b.symbol > a.symbol) {
          return 1;
        }
        return 0;
      },
      Change: (a: PairObj, b: PairObj) => a.priceChangePercent - b.priceChangePercent,
      ChangeDescending: (a: PairObj, b: PairObj) => b.priceChangePercent - a.priceChangePercent,
    };

    Object.keys(pairList).forEach(market => {
      newPairList[market] = pairList[market].sort(sortTable[sortBy]);
    });

    return newPairList;
  },
);
export const selectWatchlist = (state: Store) => activeExchange(state).filteredPairsList.watchlist;
export const selectActivePair = (state: Store) => activeExchange(state).activePair;
export const selectPairInfo = (state: Store) => activeExchange(state).pairList[activePair(state)];

export const selectOrderbook = (state: Store) => activeExchange(state).data[activePair(state)].orderBook;
export const selectTrades = (state: Store) => activeExchange(state).data[activePair(state)].trades;
export const selectPrice = (state: Store) => activeExchange(state).data[activePair(state)].price;
export const selectIsPriceRising = (state: Store) => activeExchange(state).data[activePair(state)].ispriceRising;
export const selectStringPrice = (state: Store) => formatPrice(selectPrice(state));

export const selectTradeRow = (state: Store, id: number) => activeExchange(state).data[activePair(state)].trades[id];
export const selectOrderbookRow = (state: Store, side: string, id: number) => {
  const asksOrBids = activeExchange(state).data[activePair(state)].orderBook[side];
  if (side === 'asks') {
    const { length } = asksOrBids;
    return asksOrBids[length + id - 1000];
  }
  return asksOrBids[id];
};

export const selectMarginalBase = (state: Store) => selectPairInfo(state)?.base;
export const selectMarginalQuote = (state: Store) => selectPairInfo(state)?.quote;
