import ReWS from 'reconnecting-websocket';
import { OnDepthUpdateRes, OnKlineRes, OnTradeRes } from 'renderer/api/exchangesApi/types';

export interface ExchangeApiClass {
  getSupportedInterval: () => string[];
  setupWebSocket: (eventHandler: (res:  any) => void, path: string, type: SocketType) => void;
  closeWebSocket?: () => void;
  onTrade: (symbol: string, eventHandler: (data: OnTradeRes) => void) => void;
  onDepthUpdate: (symbol: string, eventHandler: (data: OnDepthUpdateRes) => void) => ReWS | undefined;
  onDepthLevelUpdate?: (symbol: string, eventHandler: () => void) => void;
  onKline: (symbol: string, interval: number | string, eventHandler: (data: OnKlineRes) => void) => ReWS | undefined;
  getPairs: () => void;
  getKline: (pair: string, interval: number | string, start: number, end: number) => void;

  closeTrade(): void;
  closeOB(): void;
  closeKline(): void;
}

export interface Sockets {
  trade?: ReWS;
  kline?: ReWS;
  orderbook?: ReWS;
}

export type SocketType = keyof Sockets;
