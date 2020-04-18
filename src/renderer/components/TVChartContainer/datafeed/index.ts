/* eslint-disable @typescript-eslint/camelcase */
import webca from 'websocket-crypto-api';
import logger from '../../../utils/logger';
import historyProvider from './historyProvider';
import updater from './updater';
import { loadState } from '../../../utils/localStorage';

import { forSince, getTimezone } from '../../../utils/chartUtils';
import { IBasicDataFeed } from '../../../../charting_library/charting_library.min';
import { LibrarySymbolInfo } from '../../../../charting_library/datafeed-api';

const supportedResolutions = ['1', '3', '5', '15', '30', '60', '120', '240', '1D', '1W', '1M'];

const config = {
  timezone: getTimezone(),
  supported_resolutions: supportedResolutions,
  supports_marks: true,
};

const Datafeed: IBasicDataFeed = {
  onReady: (cb) => {
    setTimeout(() => {
      try {
        cb(config);
      } catch (error) {
        console.error('Datafeed onReady Error');
      }
    }, 0);
  },
  searchSymbols: () => {},
  resolveSymbol: (symbolName, onSymbolResolvedCallback) => {
    const splitData = symbolName.split(/[:/]/);

    const resolut = new webca[splitData[0]]().getSupportedInterval();

    const symbolStub: LibrarySymbolInfo = {
      name: symbolName,
      description: `${splitData[1]}/${splitData[2]}`,
      type: 'crypto',
      session: '24x7',
      timezone: getTimezone(),
      ticker: symbolName,
      exchange: '',
      minmov: 1,
      pricescale: 100000000,
      has_intraday: true,
      has_weekly_and_monthly: true,
      intraday_multipliers: resolut,
      supported_resolutions: supportedResolutions,
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
      onSymbolResolvedCallback(symbolStub);
    }, 0);
  },
  getBars: (symbolInfo, resolution, from, to, onHistoryCallback, onErrorCallback, firstDataRequest) => {
    try {
      const cacheCandles = loadState(symbolInfo.full_name + resolution);
      if (cacheCandles && firstDataRequest) {
        onHistoryCallback(cacheCandles, {
          noData: false,
        });
        const nowTime = new Date().getTime();
        const interval = forSince(resolution);
        if (nowTime - cacheCandles[cacheCandles.length - 1].time > interval * 1000) {
          delete window.localStorage[symbolInfo.full_name + resolution];
          window.resetCache?.();
          window.tvWidget.chart().resetData();
        }
      } else {
        historyProvider
          .getBars(symbolInfo, resolution, from, to, firstDataRequest)
          .then((bars) =>
            onHistoryCallback(bars, {
              noData: bars.length === 0,
              nextTime: bars.length ? bars[0].time : 0,
            }),
          )
          .catch((err) => {
            logger.error(err, '10');
            onErrorCallback(err);
          });
      }
    } catch (err) {
      console.error('Datafeed getBars Error');
    }
  },
  subscribeBars: (symbolInfo, resolution, onRealtimeCallback, subscribeUID, onResetCacheNeededCallback) => {
    updater.subscribeBars(symbolInfo, resolution, onRealtimeCallback, subscribeUID, onResetCacheNeededCallback);
  },
  unsubscribeBars: () => {
    updater.unsubscribeBars();
  },
  calculateHistoryDepth: (resolution) => {
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
      intervalBack: 0.25,
    };
  },
};

export default Datafeed;
