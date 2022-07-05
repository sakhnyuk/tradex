import { CandleInfoModel, OrderBookUpdateInfo, PairListModel, TradeInfoModel } from 'lib/core/models';
import { ChartTimeframe, ExchangeName } from 'lib/core/types';

export interface ExchangeProvider {
  /**
   * Returns name of the Exchange
   */
  getName: () => ExchangeName;
  getKey: () => string;
  getSupportedTimeframes: () => ChartTimeframe[];
  getDefaultTimeframe: () => ChartTimeframe;
  getDefaultSymbol: () => TradeSymbol;
  getStableCoins: () => TradeSymbol[];

  onTradeUpdate: (symbol: TradeSymbol, eventHandler: (data: TradeInfoModel) => void) => void;
  onOrderBookUpdate: (symbol: TradeSymbol, eventHandler: (data: OrderBookUpdateInfo) => void) => void;
  onCandleUpdate: (
    symbol: TradeSymbol,
    interval: ChartTimeframe,
    eventHandler: (data: CandleInfoModel) => void,
  ) => void;

  closeTrade(): void;
  closeOrderBook(): void;
  closeCandle(): void;

  getPairs: () => Promise<PairListModel>;
  getCandles: (
    symbol: TradeSymbol,
    interval: ChartTimeframe,
    start: Timestamp,
    end: Timestamp,
    count?: number,
  ) => Promise<CandleInfoModel[]>;
  getTradesHistory: (symbol: TradeSymbol) => Promise<TradeInfoModel[]>;
  getOrderBook: (symbol: string) => Promise<OrderBookUpdateInfo>;
}
