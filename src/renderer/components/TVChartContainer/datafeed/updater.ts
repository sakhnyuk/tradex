// api for realtime update candles

import { Exchange } from 'renderer/appConstant';
import { ExchangeApiClass } from 'renderer/api/exchangesApi/exchanges/baseInteface';
import { LibrarySymbolInfo, SubscribeBarsCallback } from 'charting_library/datafeed-api';
import api from '../../../api/exchangesApi/exchanges';

let socket: ExchangeApiClass | null = null;

export default {
  subscribeBars(
    symbolInfo: LibrarySymbolInfo,
    resolution: string,
    updateCb: SubscribeBarsCallback,
    uid: string,
    resetCache: () => void,
  ) {
    const splitSymbol = symbolInfo.name.split(/[:/]/);
    const symbol = `${splitSymbol[1]}/${splitSymbol[2]}`;
    const exchange = splitSymbol[0].toLowerCase() as Exchange;

    let lastCandle = {};

    if (Array.isArray(window.updateCbs)) {
      window.updateCbs.push(updateCb);
    } else {
      window.updateCbs = [updateCb];
    }

    window.updateChartPrice = (close: number) => {
      if (!Object.keys(lastCandle).length) {
        return;
      }

      window.updateCbs.forEach((cb) => cb({ ...lastCandle, close }));
    };

    socket = new api[exchange]();
    socket.onKline(symbol, resolution, (data) => {
      if (data) {
        lastCandle = data;
      }
    });

    window.resetCache = resetCache;
  },

  unsubscribeBars() {
    if (socket) {
      socket.closeKline();
    }
  },
};
