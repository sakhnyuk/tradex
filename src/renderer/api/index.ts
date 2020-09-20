/* eslint-disable no-underscore-dangle */
import { eventChannel, EventChannel } from 'redux-saga';
import { ExchangeApiClass } from 'renderer/api/exchangesApi/exchanges/baseInteface';
import { LibrarySymbolInfo } from 'charting_library/charting_library.min';
import webca from './exchangesApi/exchanges';
import { Exchange, exchanges } from '../appConstant';
import { OnDepthUpdateRes, OnKlineRes, OnTradeRes } from './exchangesApi/types';

class ReduxSagaWebca {
  instances: { [key: string]: ExchangeApiClass } = {};

  _tradesChannel: EventChannel<OnTradeRes> | null = null;

  _orderbookChannel: EventChannel<OnDepthUpdateRes> | null = null;

  _klinesChannel: EventChannel<OnKlineRes> | null = null;

  public: any;

  private: any;

  constructor() {
    // fill in webcas by key
    exchanges.forEach((exchange) => {
      this.instances[exchange] = new webca[exchange]();
    });

    // public subscription methods and some public fetch methods
    this.public = {
      tradesChannel: this.tradesChannel,
      orderbookChannel: this.orderbookChannel,
      klinesChannel: this.klinesChannel,
      fetchPairList: this.fetchPairList,
      fetchOHLCV: this.fetchOHLCV,
    };
  }

  // PUBLIC METHODS
  tradesChannel = ({ exchange, pair }: { exchange: Exchange; pair: string }) => {
    if (this._tradesChannel) this._tradesChannel.close();

    const api = this.instances[exchange];

    const channel = eventChannel<OnTradeRes>((emit) => {
      api.onTrade(pair, (data: OnTradeRes) => {
        emit(data);
      });

      // Returning unsubscribe callback
      return () => {
        api.closeTrade();
      };
    });

    this._tradesChannel = channel;
    return channel;
  };

  orderbookChannel = ({ exchange, pair }: { exchange: Exchange; pair: string }) => {
    if (this._orderbookChannel) this._orderbookChannel.close();
    const api = this.instances[exchange];

    const channel = eventChannel<OnDepthUpdateRes>((emit) => {
      api.onDepthUpdate(pair, (data: OnDepthUpdateRes) => {
        emit(data);
      });

      // Returning unsubscribe callback
      return () => {
        api.closeOB();
      };
    });

    this._orderbookChannel = channel;
    return channel;
  };

  klinesChannel = ({ exchange, pair }: { exchange: Exchange; pair: string }) => {
    if (this._klinesChannel) this._klinesChannel.close();
    const api = this.instances[exchange];

    const channel = eventChannel<OnKlineRes>((emit) => {
      api.onKline(pair, 60, (data: OnKlineRes) => {
        emit(data);
      });

      // Returning unsubscribe callback
      return () => {
        api.closeKline();
      };
    });

    this._klinesChannel = channel;
    return channel;
  }

  fetchPairList = async (exchange: Exchange) => {
    return this.instances[exchange].getPairs();
  };

  fetchOHLCV = async (symbolInfo: LibrarySymbolInfo, resolution: string, from: number, to: number) => {
    // we got symbolInfo for example = binance:BTC/USDT
    // So we should split it
    const [exchange, base, quote] = symbolInfo.name.split(/[:/]/);
    const pair = `${base}/${quote}`;

    try {
      return await this.instances[exchange].getKline(pair, resolution, from, to);
    } catch (error) {
      throw new Error(`exchangeApi fetchOHLCV ${error.message}`);
    }
  };
}

const API = new ReduxSagaWebca();

export default API;
