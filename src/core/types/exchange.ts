import { ExchangeName } from 'core/adapters';
import { OrderBookModel, PairListModel, TradeInfoModel } from 'core/models';
import { ExchangeProvider } from 'core/ports';

export enum ExchangeConnectionStatus {
  CONNECTED = 'connected',
  DISCONNECTED = 'disconnected',
}

export type ExchangeUpdateHandler = (exchange: ExchangeProvider) => void;
export type ExchangeNameUpdateHandler = (exchange: ExchangeName) => void;
export type SymbolUpdateHandler = (symbol: TradeSymbol) => void;
export type PairListUpdateHandler = (pairList: PairListModel) => void;
export type TradeInfoAddedHandler = (tradeInfo: TradeInfoModel) => void;
export type OrderBookUpdateHandler = (orderBook: OrderBookModel) => void;
