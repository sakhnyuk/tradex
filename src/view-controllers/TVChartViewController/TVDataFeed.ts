import { forSince, getTimezone } from 'utils/chartUtils';
import { ChartController, ExchangeController, TradeHistoryController } from 'lib/core/controllers';
import { CandleInfoModel, TradeInfoModel } from 'lib/core/models';
import type { Logger } from 'lib/core/ports';
import { CandleUpdateHandler, ChartTimeframe, ExchangeName, TradeInfoAddedHandler } from 'lib/core/types';
import {
  ErrorCallback,
  HistoryCallback,
  IBasicDataFeed,
  LibrarySymbolInfo,
  OnReadyCallback,
  PeriodParams,
  ResolutionString,
  ResolveCallback,
  SearchSymbolsCallback,
  SubscribeBarsCallback,
} from 'charting_library/charting_library';
import { Inject, Service } from 'typedi';

export const supportedResolutions = [
  '1',
  '3',
  '5',
  '15',
  '30',
  '60',
  '120',
  '240',
  '1D',
  '1W',
  '1M',
] as ResolutionString[];

@Service()
export class TVDataFeed implements IBasicDataFeed {
  @Inject('Logger')
  logger!: Logger;

  @Inject()
  exchangeController!: ExchangeController;

  @Inject()
  chartController!: ChartController;

  @Inject()
  tradeHistoryController!: TradeHistoryController;

  private lastCandle?: CandleInfoModel;
  private candleListenerGuid?: string;
  public resetCache?: () => void;

  private onTick: SubscribeBarsCallback = () => {};

  private candleUpdater: CandleUpdateHandler = (candle: CandleInfoModel) => {
    this.lastCandle = candle;
    this.onTick(candle);
  };

  private priceUpdaterByTrade: TradeInfoAddedHandler = (trade: TradeInfoModel) => {
    if (!this.lastCandle) return;

    const isCandleOpened = trade.time < this.lastCandle?.time + forSince(this.chartController.getTimeframe()) * 1000;
    const isPriceDifferent = this.lastCandle.close !== trade.price;

    if (isCandleOpened && isPriceDifferent) {
      const updatedCandle = this.lastCandle.updateModel({ close: trade.price }, CandleInfoModel);
      this.lastCandle = updatedCandle;
      this.onTick(this.lastCandle);
    }
  };

  onReady(callback: OnReadyCallback): void {
    try {
      setTimeout(() => {
        callback({
          supported_resolutions: supportedResolutions,
          supports_marks: true,
        });
      }, 0);
    } catch (error) {
      this.logger.error('Datafeed onReady Error');
    }
  }

  searchSymbols(userInput: string, exchange: string, symbolType: string, onResult: SearchSymbolsCallback): void {}

  resolveSymbol(symbolName: string, onResolve: ResolveCallback, onError: ErrorCallback): void {
    this.logger.info('resolveSymbol', symbolName);
    const splitData = symbolName.split(/[:/]/);
    const ticker = splitData[1] + splitData[2];
    const exchange = splitData[0].toLowerCase() as ExchangeName;
    const supportedTimeframes = this.exchangeController.getSupportedTimeframes() as ResolutionString[];

    const symbolStub: LibrarySymbolInfo = {
      name: symbolName,
      description: `${splitData[1]}/${splitData[2]}`,
      type: 'crypto',
      session: '24x7',
      timezone: getTimezone(),
      ticker: symbolName,
      exchange,
      minmov: 1,
      pricescale: 100000000,
      has_intraday: true,
      has_daily: true,
      has_weekly_and_monthly: true,
      supported_resolutions: supportedTimeframes,
      volume_precision: 8,
      data_status: 'streaming',
      full_name: ticker,
      format: 'price',
      listed_exchange: splitData[0],
      sector: 'crypto',
    };

    if (splitData[2].match(/USDT|USD|EUR|JPY|AUD|GBP|KRW|CNY/)) {
      symbolStub.pricescale = 10000;
    }
    setTimeout(() => {
      onResolve(symbolStub);
    }, 0);
  }

  getBars(
    symbolInfo: LibrarySymbolInfo,
    resolution: string,
    periodParams: PeriodParams,
    onResult: HistoryCallback,
    onError: ErrorCallback,
  ): void {
    const { from, to, countBack, firstDataRequest } = periodParams;
    const currentTimeframe = this.chartController.getTimeframe();

    if (currentTimeframe !== resolution) {
      this.chartController.setTimeframe(resolution as ChartTimeframe);
    }

    try {
      this.chartController.getCandles(from, to, countBack).then((candles) => {
        if (candles.length > 0 && firstDataRequest) {
          this.lastCandle = candles[candles.length - 1];
        }

        onResult(candles, {
          noData: candles.length === 0,
        });
      });
    } catch (error) {
      if (error instanceof Error) {
        onError(error.message);
      }
      this.logger.error('Datafeed getBars Error');
    }
  }

  subscribeBars(
    symbolInfo: LibrarySymbolInfo,
    resolution: string,
    onTick: SubscribeBarsCallback,
    listenerGuid: string,
    onResetCacheNeededCallback: () => void,
  ): void {
    this.onTick = onTick;
    this.candleListenerGuid = listenerGuid;
    this.resetCache = onResetCacheNeededCallback;

    this.chartController.addCandleUpdateListener(this.candleUpdater);
    this.tradeHistoryController.addTradeUpdateListener(this.priceUpdaterByTrade);
    this.chartController.initCandles();
  }

  unsubscribeBars(listenerGuid: string): void {
    if (this.candleListenerGuid === listenerGuid) {
      this.chartController.closeUpdateCandle();
      this.tradeHistoryController.removeTradeUpdateListener(this.priceUpdaterByTrade);
      this.candleListenerGuid = undefined;
    }
  }

  calculateHistoryDepth(resolution: string) {
    if (resolution === '1W' || resolution === 'W') {
      return {
        resolutionBack: 'M',
        intervalBack: 12,
      };
    }
    if (resolution === '1D' || resolution === 'D') {
      return {
        resolutionBack: 'M',
        intervalBack: 6,
      };
    }
    if (resolution === '60') {
      return {
        resolutionBack: 'D',
        intervalBack: 5,
      };
    }
    if (resolution === '30') {
      return {
        resolutionBack: 'D',
        intervalBack: 5,
      };
    }
    return {
      resolutionBack: 'D',
      intervalBack: 1,
    };
  }
}
