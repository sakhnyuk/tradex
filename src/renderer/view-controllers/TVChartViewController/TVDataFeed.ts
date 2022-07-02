import { getTimezone } from 'app/utils/chartUtils';
import { ChartController, ExchangeController } from 'core/controllers';
import type { Logger } from 'core/ports';
import { ExchangeName } from 'core/types';
import {
  ErrorCallback,
  HistoryCallback,
  HistoryDepth,
  IBasicDataFeed,
  LibrarySymbolInfo,
  OnReadyCallback,
  ResolveCallback,
  SearchSymbolsCallback,
  SubscribeBarsCallback,
} from 'tv-chart/charting_library.min';
import { Inject, Service } from 'typedi';

export const supportedResolutions = ['1', '3', '5', '15', '30', '60', '120', '240', '1D', '1W', '1M'];

@Service()
export class TVDataFeed implements IBasicDataFeed {
  @Inject('Logger')
  logger!: Logger;

  @Inject()
  exchangeController!: ExchangeController;

  @Inject()
  chartController!: ChartController;

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
    this.logger.info('resolveSymbol');
    const splitData = symbolName.split(/[:/]/);
    const exchange = splitData[0].toLowerCase() as ExchangeName;
    const supportedTimeframes = this.exchangeController.getSupportedTimeframes();

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
      has_weekly_and_monthly: true,
      intraday_multipliers: supportedTimeframes, // TODO: Add resolution from API
      supported_resolutions: supportedResolutions, // TODO: Add resolution from API
      volume_precision: 8,
      data_status: 'streaming',
      full_name: symbolName,
      format: 'price',
      listed_exchange: splitData[0],
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
    rangeStartDate: number,
    rangeEndDate: number,
    onResult: HistoryCallback,
    onError: ErrorCallback,
    isFirstCall: boolean,
  ): void {
    try {
      this.chartController.getCandles(rangeStartDate, rangeEndDate).then((candles) => {
        onResult(candles, {
          noData: candles.length === 0,
          nextTime: candles.length ? candles[0].time : 0,
        });
      });
    } catch (err) {
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
    const splitSymbol = symbolInfo.name.split(/[:/]/);
    const symbol = `${splitSymbol[1]}/${splitSymbol[2]}`;
    const exchange = splitSymbol[0].toLowerCase() as ExchangeName;

    let lastCandle = {};

    this.chartController.addCandleUpdateListener(onTick);
    this.chartController.initCandles();
  }

  unsubscribeBars(): void {
    this.chartController.closeUpdateCandle();
  }

  calculateHistoryDepth(resolution: string): HistoryDepth {
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
