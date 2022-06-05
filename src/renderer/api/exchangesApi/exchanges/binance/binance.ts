import ReWS from 'reconnecting-websocket';
import { ExchangeApiClass, Sockets, SocketType } from '../baseInteface';
import { DepthAPIRes, DepthSocketRes, TradeStream, TradeRes, PairInfo, KlinePayload } from './types';
import { KlineResItem, OnDepthUpdateRes, OnKlineRes, OnTradeRes, PairData, PairsMapped } from '../../types';

export class Binance implements ExchangeApiClass {
  name = 'Binance';

  private readonly BASE_WS_URL = 'wss://stream.binance.com:9443/ws/';

  readonly BASE_URL = `https://api.binance.com`;

  sockets: Sockets = {};

  orderBook = (symbol: string) => `https://www.binance.com/api/v1/depth?symbol=${symbol}&limit=1000`;

  trades = (symbol: string) => `https://www.binance.com/api/v1/trades?symbol=${symbol}&limit=20`;

  pairsUrl = 'https://api.binance.com/api/v1/ticker/24hr';

  streams = {
    depth: (symbol: string) => `${symbol.toLowerCase()}@depth`,
    depthLevel: (symbol: string, level: string) => `${symbol.toLowerCase()}@depth${level}`,
    kline: (symbol: string, interval: number | string) => `${symbol.toLowerCase()}@kline_${this.times[interval]}`,
    trade: (symbol: string) => `${symbol.toLowerCase()}@aggTrade`,
    ticker: (symbol: string) => `${symbol.toLowerCase()}@ticker`,
  };

  times = {
    1: '1m',
    3: '3m',
    5: '5m',
    15: '15m',
    30: '30m',
    60: '1h',
    120: '2h',
    240: '4h',
    360: '6h',
    480: '8h',
    720: '12h',
    '1D': '1d',
    '1W': '1w',
    '1M': '1M',
  } as { [key: string]: string };

  stableCoins = ['USD', 'USDT', 'PAX', 'SDC', 'BUSD'];

  getSupportedInterval = () => Object.keys(this.times);

  setupWebSocket(eventHandler: (res: any) => void, path: string, type: SocketType) {
    const socket = this.sockets[type];

    if (socket) {
      socket.close();
    }

    const fullPath = this.BASE_WS_URL + path;
    const newSocket = new ReWS(fullPath, [], {
      WebSocket,
      connectionTimeout: 5000,
      debug: false,
    });

    newSocket.onmessage = (event) => {
      const res = JSON.parse(event.data);
      eventHandler(res);
    };

    this.sockets[type] = newSocket;

    return this.sockets[type];
  }

  closeTrade() {
    if (this.sockets.trade) this.sockets.trade.close();
  }

  closeOB() {
    if (this.sockets.orderbook) this.sockets.orderbook.close();
  }

  closeKline() {
    if (this.sockets.kline) this.sockets.kline.close();
  }

  onTrade(symbol = 'BTC/USDT', eventHandler: (res: OnTradeRes) => void) {
    const splitSymbol = symbol.split(/[:/]/);
    const newSymbol = splitSymbol[0] + splitSymbol[1];

    const handler = (res: TradeStream) => {
      const side = res.m ? 'sell' : 'buy';

      const trade: OnTradeRes = {
        id: res.f,
        side,
        timestamp: res.T,
        price: +res.p,
        amount: +res.q,
        symbol,
        exchange: 'binance',
      };

      eventHandler(trade);
    };

    fetch(this.trades(newSymbol))
      .then((r) => r.json())
      .then((res: TradeRes[]) => {
        res.forEach((raw) => {
          const trade: OnTradeRes = {
            id: raw.id,
            side: raw.isBuyerMaker ? 'buy' : 'sell',
            timestamp: raw.time,
            price: +raw.price,
            amount: +raw.qty,
            symbol,
            exchange: 'binance',
          };

          eventHandler(trade);
        });

        return this.setupWebSocket(handler, this.streams.trade(newSymbol), 'trade');
      });
  }

  depthFetch = (symbol: string, eventHandler: (res: OnDepthUpdateRes) => void) =>
    fetch(this.orderBook(symbol))
      .then((r) => r.json())
      .then((res: DepthAPIRes) => {
        const data: OnDepthUpdateRes = {
          asks: [],
          bids: [],
          type: 'snapshot',
          exchange: this.name,
          symbol,
        };

        res.asks.forEach((r) => data.asks.push([+r[0], +r[1]]));
        res.bids.forEach((r) => data.bids.push([+r[0], +r[1]]));
        eventHandler(data);
      });

  onDepthUpdate(symbol: string, eventHandler: (data: OnDepthUpdateRes) => void): ReWS | undefined {
    const splitSymbol = symbol.split(/[:/]/);
    const newSymbol = splitSymbol[0] + splitSymbol[1];
    const uBuffer: OnDepthUpdateRes = {
      asks: [],
      bids: [],
      type: 'update',
      exchange: this.name,
      symbol,
    };
    let SnapshotAccepted = false;

    this.depthFetch(newSymbol, eventHandler);

    const handler = (res: DepthSocketRes) => {
      if (SnapshotAccepted) {
        const data: OnDepthUpdateRes = {
          asks: [],
          bids: [],
          type: 'update',
          exchange: this.name,
          symbol,
        };

        res.a.forEach((r) => data.asks.push([+r[0], +r[1]]));
        res.b.forEach((r) => data.bids.push([+r[0], +r[1]]));
        eventHandler(data);
      } else {
        res.a.forEach((r) => uBuffer.asks.push([+r[0], +r[1]]));
        res.b.forEach((r) => uBuffer.bids.push([+r[0], +r[1]]));
      }
    };

    const socket = this.setupWebSocket(handler, this.streams.depth(newSymbol), 'orderbook');

    if (socket) {
      socket.onopen = () => {
        this.depthFetch(newSymbol, eventHandler).then(() => {
          SnapshotAccepted = true;
          eventHandler(uBuffer);
        });
      };
    }

    return socket;
  }

  onKline(symbol: string, interval: number | string, eventHandler: (data: OnKlineRes) => void): ReWS | undefined {
    const splitSymbol = symbol.split(/[:/]/);
    const newSymbol = splitSymbol[0] + splitSymbol[1];

    const handler = (data: KlinePayload) => {
      const newData = {
        close: +data.k.c,
        high: +data.k.h,
        low: +data.k.l,
        open: +data.k.o,
        time: +data.k.T,
        volume: +data.k.v,
      };

      eventHandler(newData);
    };

    return this.setupWebSocket(handler, this.streams.kline(newSymbol, interval), 'kline');
  }

  async getPairs() {
    return fetch(this.pairsUrl)
      .then((r) => r.json())
      .then((r: PairInfo[]) => {
        const pairs: PairsMapped = {
          BTC: [],
          ALT: [],
          STABLE: [],
        };

        const fullList: { [key: string]: PairData } = {};

        r.forEach((pair) => {
          const base =
            pair.symbol.indexOf('USDT') === -1
              ? pair.symbol.substring(pair.symbol.length - 3)
              : pair.symbol.substring(pair.symbol.length - 4);
          const target =
            base === 'USDT'
              ? pair.symbol.substring(0, pair.symbol.length - 4)
              : pair.symbol.substring(0, pair.symbol.length - 3);

          const symbol = `${target}/${base}`;

          const data: PairData = {
            symbol,
            volume: +pair.quoteVolume,
            priceChangePercent: +pair.priceChangePercent,
            price: +pair.lastPrice,
            high: +pair.highPrice,
            low: +pair.lowPrice,
            quote: target,
            base,
            maxLeverage: 0,
            tickSize: 0,
          };

          if (data.price !== 0) {
            if (base === 'BTC') {
              pairs[base].push(data);
            } else if (this.stableCoins.indexOf(base) !== -1) {
              pairs.STABLE.push(data);
            } else {
              pairs.ALT.push(data);
            }
            fullList[symbol] = data;
          }
        });

        return [pairs, fullList];
      });
  }

  async getKline(pair = 'BTC/USDT', interval: number | string = 60, start = 0, end?: number): Promise<KlineResItem[]> {
    let endTime = 0;

    if (!end) {
      endTime = new Date().getTime() / 1000;
    } else {
      endTime = end;
    }

    const symbol = pair.replace('/', '');
    return fetch(
      `https://api.binance.com/api/v1/klines?symbol=${symbol}&interval=${this.times[interval]}&endTime=${
        endTime * 1000
      }&limit=1000`,
    )
      .then((r) => r.json())
      .then((r) => {
        return r.map((obj: (string | number)[]) => {
          return {
            time: obj[0],
            open: +obj[1],
            high: +obj[2],
            low: +obj[3],
            close: +obj[4],
            volume: +obj[5],
          };
        });
      });
  }
}
