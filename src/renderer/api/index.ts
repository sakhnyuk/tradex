/* eslint-disable no-underscore-dangle */
import webca from 'websocket-crypto-api';

import { eventChannel } from 'redux-saga';
import { exchanges, Exchange } from '../appConstant';

class ReduxSagaWebca {
  webcas: { [key: string]: any } = {};

  _tradesChannel: any;

  _orderbookChannel: any;

  _klinesChannel: any;

  public: any;

  private: any;

  constructor() {
    // fill in webcas by key
    exchanges.forEach(exch => {
      this.webcas[exch] = new webca[exch]();
    });

    // public subscription methods and some public fetch methods
    this.public = {
      tradesChannel: this.tradesChannel,
      orderbookChannel: this.orderbookChannel,
      klinesChannel: this.klinesChannel,
      fetchExchangeConfig: this.fetchExchangeConfig,
      fetchPairList: this.fetchPairList,
      fetchOHLCV: this.fetchOHLCV,
    };

    // private api calls
    this.private = {
      fetchClosedOrders: this.fetchClosedOrders,
      fetchOpenedOrders: this.fetchOpenedOrders,
      fetchBalances: this.fetchBalances,
      createOrder: this.createOrder,
      cancelOrder: this.cancelOrder,
      fetchOrder: this.fetchOrder,
      putLeverage: this.putLeverage,
      fetchPositions: this.fetchPositions,
    };
  }

  // PUBLIC METHODS

  tradesChannel({ exchange, pair }: { exchange: Exchange; pair: string }) {
    if (this._tradesChannel) this._tradesChannel.close();

    const api = this.webcas[exchange];

    const channel = eventChannel(emit => {
      api.onTrade(pair, (data: string[][]) => {
        emit(data);
      });
      const unsubscribe = () => {
        api.closeTrade();
      };

      return unsubscribe;
    });

    this._tradesChannel = channel;
    return channel;
  }

  orderbookChannel = ({ exchange, pair }: { exchange: Exchange; pair: string }) => {
    if (this._orderbookChannel) this._orderbookChannel.close();
    const api = this.webcas[exchange];

    const channel = eventChannel(emit => {
      api.onDepthUpdate(pair, (data: any) => {
        emit(data);
      });

      const unsubscribe = () => {
        api.closeOB();
      };

      return unsubscribe;
    });

    this._orderbookChannel = channel;
    return channel;
  };

  klinesChannel({ exchange, pair }: { exchange: Exchange; pair: string }) {
    if (this._klinesChannel) this._klinesChannel.close();
    const api = this.webcas[exchange];

    const channel = eventChannel(emit => {
      api.onKline(pair, (data: any) => {
        emit(data);
      });

      const unsubscribe = () => {
        api.closeKline();
      };

      return unsubscribe;
    });

    this._klinesChannel = channel;
    return channel;
  }

  fetchExchangeConfig = async (exchange: Exchange) => {
    return this.webcas[exchange].getExchangeConfig();
  };

  fetchPairList = async (exchange: Exchange) => {
    return this.webcas[exchange].getPairs();
  };

  fetchOHLCV = async (symbolInfo: string, resolution: string, from: number, to: number) => {
    // we got symbolInfo for example = binance:BTC/USDT
    // So we shuold split it
    const [exchange, base, quote] = symbolInfo.name.split(/[:/]/);
    const pair = `${base}/${quote}`;

    try {
      const candles = await this.webcas[exchange].getKline(pair, resolution, from, to);

      return candles;
    } catch (error) {
      throw new Error(`exchangeApi fetchOHLCV ${error.message}`);
    }
  };

  // PRIVATE METHODS

  fetchBalances = async ({
    exchange,
    apiKey,
    apiSecret,
    isMargin,
  }: {
    exchange: Exchange;
    apiKey: string;
    apiSecret: string;
    isMargin: boolean;
  }) => {
    const balances = await this.webcas[exchange].getBalance({ apiKey, apiSecret });
    return isMargin ? balances.margin : balances.exchange;
  };

  fetchClosedOrders = async ({ exchange, apiKey, apiSecret, pair }: any) => {
    return this.webcas[exchange].getClosedOrders({ apiKey, apiSecret }, { pair });
  };

  fetchPositions = async ({ exchange, apiKey, apiSecret, pair }: any) => {
    return this.webcas[exchange].getPositions({ apiKey, apiSecret }, { pair });
  };

  putLeverage = ({ exchange, apiKey, apiSecret, pair, leverage }: any) => {
    return this.webcas[exchange].setLeverage({ apiKey, apiSecret }, { pair, leverage });
  };

  fetchOpenedOrders = ({ exchange, apiKey, apiSecret }: any) => {
    return this.webcas[exchange].getOpenOrders({ apiKey, apiSecret });
  };

  cancelOrder = ({ exchange, apiKey, apiSecret, orderId, pair }: any) => {
    return this.webcas[exchange].cancelOrder({ apiKey, apiSecret }, { pair, orderId });
  };

  createOrder = async ({ exchange, apiKey, apiSecret, type, pair, side, volume, price, stopPx, trailValue }: any) => {
    return this.webcas[exchange].createOrder(
      { apiKey, apiSecret },
      { type, pair, side, volume, price, stopPx, trailValue },
    );
  };

  fetchOrder = async ({ exchange, apiKey, apiSecret, orderId, pair, status }: any) => {
    return this.webcas[exchange].getAllOrders({ apiKey, apiSecret }, { pair, status, orderId });
  };
}

const API = new ReduxSagaWebca();

export default API;
