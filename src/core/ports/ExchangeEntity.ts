import { CandleInfoModel, OrderBookUpdateInfo, PairListModel, TradeInfoModel } from 'core/models';

export interface ExchangeEntity {
  /**
   * Returns name of the Exchange
   */
  getName: () => string;
  getKey: () => string;
  getSupportedTimeframes: () => string[];
  getDefaultSymbol: () => TradeSymbol;
  getStableCoins: () => TradeSymbol[];

  onTradeUpdate: (symbol: TradeSymbol, eventHandler: (data: TradeInfoModel) => void) => void;
  onOrderBookUpdate: (symbol: TradeSymbol, eventHandler: (data: OrderBookUpdateInfo) => void) => void;
  onCandleUpdate: (symbol: TradeSymbol, interval: string, eventHandler: (data: CandleInfoModel) => void) => void;

  closeTrade(): void;
  closeOrderBook(): void;
  closeCandle(): void;

  getPairs: () => Promise<PairListModel>;
  getCandles: (symbol: TradeSymbol, interval: string, start: Timestamp, end: Timestamp) => Promise<CandleInfoModel[]>;
  getTradesHistory: (symbol: TradeSymbol) => Promise<TradeInfoModel[]>;
  getOrderBook: (symbol: string) => Promise<OrderBookUpdateInfo>;
}
