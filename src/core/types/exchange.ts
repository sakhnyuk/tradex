import { CandleInfoModel, OrderBookModel, PairListModel, TradeInfoModel } from 'core/models';
import { ExchangeProvider } from 'core/ports';
import { ChartTimeframe } from './chart';

export enum ExchangeConnectionStatus {
  CONNECTED = 'connected',
  DISCONNECTED = 'disconnected',
}

export enum ExchangeName {
  BINANCE = 'binance',
}

export type ExchangeUpdateHandler = (exchange: ExchangeProvider) => void;
export type ExchangeNameUpdateHandler = (exchange: ExchangeName) => void;
export type PairUpdateHandler = (symbol: TradeSymbol) => void;
export type PairListUpdateHandler = (pairList: PairListModel) => void;
export type TradeInfoAddedHandler = (tradeInfo: TradeInfoModel) => void;
export type OrderBookUpdateHandler = (orderBook: OrderBookModel) => void;
export type CandleUpdateHandler = (candle: CandleInfoModel) => void;
export type TimeframeUpdateHandler = (timeframe: ChartTimeframe) => void;
