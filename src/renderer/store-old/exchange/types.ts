import { OnTradeRes } from 'app/api/exchangesApi/types';
import { Intervals, SupportedIntervals } from 'app/components/TVChartContainer/types';
import { Exchange } from '../../appConstant';

export interface PairObj {
  symbol: string;
  price: number;
  volume: number;
  priceChangePercent: number;
}

// STORE
export interface InitialData {
  trades: OnTradeRes[];
  orderBook: {
    bids: string[][];
    asks: string[][];
  };
  price: number;
  ispriceRising: boolean;
}

export interface InitialExchange {
  markets: string[];
  activeMarket: string;
  pairList: { [key: string]: PairObj };
  filteredPairsList: { [key: string]: any };
  supportedComponents: string[];
  orderTypes: string[];
  historyComponent: string;
  activeOrderType: string;
  supportedIntervals: SupportedIntervals;
  activePair?: string;
  data?: {
    [pair: string]: InitialData;
  };
}

export interface ExchangeStore {
  exchange: Exchange;
  savedPairAndExchange: any; // TODO: add types
  [exchange: string]: InitialExchange | any;
}
// -------

// Reducers args
export interface PairAndExchange {
  exchange: Exchange;
  pair: string;
}

export interface SetSupportedComponents {
  components: string[];
  exchange: Exchange;
}

export interface SetOrderTypes {
  orderTypes: string[];
  exchange: Exchange;
}

export interface SetSupportedIntervals {
  intervals: SupportedIntervals;
  exchange: Exchange;
}

export interface SetWatchlist {
  exchange: Exchange;
  watchlist: { [key: string]: any }[];
}

// --------------

export interface GroupedIntervals {
  minutes: Intervals[];
  hours: Intervals[];
  days: Intervals[];
}
