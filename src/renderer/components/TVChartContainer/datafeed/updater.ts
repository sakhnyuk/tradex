// api for realtime update candles

import webca from 'websocket-crypto-api';
import { LibrarySymbolInfo, SubscribeBarsCallback } from '../../../../charting_library/datafeed-api';

const intervalId = null;
let socket = null;

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
    const exchange = splitSymbol[0].toLowerCase();

    let lastCandle = {};

    if (Array.isArray(window.updateCbs)) {
      window.updateCbs.push(updateCb);
    } else {
      window.updateCbs = [updateCb];
    }

    window.updateChartPrice = close => {
      if (!Object.keys(lastCandle).length) {
        return;
      }

      window.updateCbs.forEach(cb => cb({ ...lastCandle, close }));
    };

    socket = new webca[exchange]();
    socket.onKline(symbol, resolution, data => {
      if (data) {
        lastCandle = data;
      }
    });

    window.resetCache = resetCache;
  },
  unsubscribeBars() {
    socket.closeKline();
    clearInterval(intervalId);
  },
};
