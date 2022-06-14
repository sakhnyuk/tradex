import ReWS from 'reconnecting-websocket';
import { ExchangeProvider } from 'core/ports';
import {
  CandleInfoModel,
  OrderBookUpdateInfo,
  PairInfoDto,
  PairInfoModel,
  PairListMappedDto,
  PairListMappedModel,
  PairListModel,
  TradeInfoModel,
} from 'core/models';
import { ExchangeName, OrderBookUpdateType, TradeSide } from 'core/types';
import {
  BinanceTradeDto,
  BinanceTradeStream,
  CandleUpdatePayload,
  OrderBookSnapshotDto,
  OrderBookUpdateDto,
  BinancePairInfoDto,
  BinanceEventHandler,
  Sockets,
  SocketType,
} from './BinanceTypes';

export class BinanceAdapter implements ExchangeProvider {
  private readonly name = ExchangeName.BINANCE;

  private readonly key = this.name.toLowerCase();

  private readonly BASE_URL = 'binance.com';

  private readonly BASE_API_URL = `https://api.${this.BASE_URL}`;

  private readonly BASE_WS_URL = `wss://stream.${this.BASE_URL}:9443/ws/`;

  private defaultTicker = 'BTC/USDT';

  private chartTimeframes: Record<string, string> = {
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
  };

  private defaultTimeframe = this.chartTimeframes[60];

  private getExchangeInfoUrl = () => `${this.BASE_API_URL}/api/v3/exchangeInfo`;

  private getOrderBookUrl = (symbol: TradeSymbol, limit = 1000): string =>
    `https://www.${this.BASE_URL}/api/v1/depth?symbol=${symbol}&limit=${limit}`;

  private getTradesUrl = (symbol: string, limit = 100): string =>
    `https://www.${this.BASE_URL}/api/v1/trades?symbol=${symbol}&limit=${limit}`;

  private getPairsUrl = (): string => `${this.BASE_API_URL}/api/v1/ticker/24hr`;

  private getCandlesUrl = (symbol: TradeSymbol, timeframe: string, endTime: number): string =>
    `${this.BASE_API_URL}/api/v1/klines?symbol=${symbol}&interval=${timeframe}&endTime=${endTime}&limit=1000`;

  private streamUrls = {
    depth: (symbol: TradeSymbol): string => `${this.BASE_WS_URL}${symbol.toLowerCase()}@depth`,
    depthLevel: (symbol: TradeSymbol, level: string): string =>
      `${this.BASE_WS_URL}${symbol.toLowerCase()}@depth${level}`,
    kline: (symbol: TradeSymbol, timeframe: number | string): string =>
      `${this.BASE_WS_URL}${symbol.toLowerCase()}@kline_${this.chartTimeframes[timeframe]}`,
    trade: (symbol: TradeSymbol): string => `${this.BASE_WS_URL}${symbol.toLowerCase()}@aggTrade`,
    ticker: (symbol: TradeSymbol): string => `${this.BASE_WS_URL}${symbol.toLowerCase()}@ticker`,
  };

  private sockets: Sockets = {
    trade: new ReWS(this.streamUrls.trade(this.defaultTicker), [], {
      startClosed: true,
    }),
    kline: new ReWS(this.streamUrls.kline(this.defaultTicker, this.defaultTimeframe), [], {
      startClosed: true,
    }),
    orderbook: new ReWS(this.streamUrls.depth(this.defaultTicker), [], {
      startClosed: true,
    }),
  };

  private stableCoins = ['USD', 'USDT', 'PAX', 'SDC', 'BUSD', 'DAI'];

  private setupWebSocket(eventHandler: BinanceEventHandler, path: string, type: SocketType): ReWS {
    const socket = this.sockets[type];

    if (socket) {
      socket.close();
    }

    const newSocket = new ReWS(path, [], {
      WebSocket,
      connectionTimeout: 5000,
      debug: false,
    });

    newSocket.onmessage = (event): void => {
      const res = JSON.parse(event.data);
      eventHandler(res);
    };

    this.sockets[type] = newSocket;

    return this.sockets[type];
  }

  public getName = (): ExchangeName => this.name;

  public getKey = (): string => this.key;

  public getDefaultSymbol = (): TradeSymbol => this.defaultTicker;

  public getSupportedTimeframes = (): string[] => Object.keys(this.chartTimeframes);

  public getStableCoins = (): string[] => this.stableCoins;

  public onTradeUpdate = async (
    symbol = this.defaultTicker,
    eventHandler: (res: TradeInfoModel) => void,
  ): Promise<void> => {
    const newSymbol: TradeSymbol = symbol.replace('/', '');

    const handler = (res: BinanceTradeStream): void => {
      const side = res.m ? TradeSide.SELL : TradeSide.BUY;

      const trade = new TradeInfoModel({
        id: res.f,
        side,
        time: res.T,
        price: +res.p,
        amount: +res.q,
        symbol,
        exchange: this.key,
      });

      eventHandler(trade);
    };

    const tradesList = await this.getTradesHistory(newSymbol);
    tradesList.forEach((item) => eventHandler(item));

    this.setupWebSocket(handler, this.streamUrls.trade(newSymbol), SocketType.TRADE);
  };

  public onOrderBookUpdate = (symbol: TradeSymbol, eventHandler: (data: OrderBookUpdateInfo) => void): void => {
    const newSymbol: TradeSymbol = symbol.replace('/', '');

    const uBuffer: OrderBookUpdateInfo = {
      asks: [],
      bids: [],
      type: OrderBookUpdateType.UPDATE,
      exchange: this.key,
      symbol,
    };
    let SnapshotAccepted = false;

    const handler = (res: OrderBookUpdateDto): void => {
      const asksBook: [Price, TradeVolume][] = res.a.map((r) => [+r[0], +r[1]]);
      const bidsBook: [Price, TradeVolume][] = res.b.map((r) => [+r[0], +r[1]]);

      if (SnapshotAccepted) {
        const data: OrderBookUpdateInfo = {
          asks: asksBook,
          bids: bidsBook,
          type: OrderBookUpdateType.UPDATE,
          exchange: this.key,
          symbol,
        };

        eventHandler(data);
      } else {
        uBuffer.asks = asksBook;
        uBuffer.bids = bidsBook;
      }
    };

    const socket = this.setupWebSocket(handler, this.streamUrls.depth(newSymbol), SocketType.ORDER_BOOK);

    if (socket) {
      socket.onopen = (): void => {
        this.getOrderBook(newSymbol).then((data) => {
          eventHandler(data);
          SnapshotAccepted = true;
          eventHandler(uBuffer);
        });
      };
    }
  };

  public onCandleUpdate = (
    symbol: TradeSymbol,
    interval: string,
    eventHandler: (data: CandleInfoModel) => void,
  ): void => {
    const newSymbol: TradeSymbol = symbol.replace('/', '');

    const handler = (data: CandleUpdatePayload): void => {
      const newData = {
        close: +data.k.c,
        high: +data.k.h,
        low: +data.k.l,
        open: +data.k.o,
        time: +data.k.T,
        volume: +data.k.v,
      };

      eventHandler(new CandleInfoModel(newData));
    };

    this.setupWebSocket(handler, this.streamUrls.kline(newSymbol, interval), SocketType.CANDLE);
  };

  public closeTrade = (): void => {
    if (this.sockets.trade) this.sockets.trade.close();
  };

  public closeOrderBook = (): void => {
    if (this.sockets.orderbook) this.sockets.orderbook.close();
  };

  public closeCandle = (): void => {
    if (this.sockets.kline) this.sockets.kline.close();
  };

  public getPairs = async (): Promise<PairListModel> => {
    const res = await fetch(this.getPairsUrl());
    const resData: BinancePairInfoDto[] = await res.json();

    const pairs: PairListMappedDto = {
      BTC: [],
      ALT: [],
      STABLE: [],
    };

    const fullList: Record<TradeSymbol, PairInfoModel> = {};

    resData.forEach((pair) => {
      const regex = /(USDT|ETH|BTC|BNB|BUSD|DAI|PAX|USDC|UST|EUR|TRY|GBP|AUD|RUB|BRL|IDR)/;
      const splittedSymbol = pair.symbol.split(regex)?.filter(Boolean) || ['', ''];
      const [target, base] = splittedSymbol;

      if (splittedSymbol.length !== 2 || !base || !target) {
        return;
      }

      const symbol = `${target}/${base}`;

      const data: PairInfoDto = {
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
          pairs[base].push(symbol);
        } else if (this.stableCoins.indexOf(base) !== -1) {
          pairs.STABLE.push(symbol);
        } else {
          pairs.ALT.push(symbol);
        }

        fullList[symbol] = new PairInfoModel(data);
      }
    });

    return new PairListModel({ mapped: new PairListMappedModel(pairs), fullList });
  };

  public getCandles = async (
    symbol: TradeSymbol = this.defaultTicker,
    interval = '60',
    endTime: Timestamp = new Date().getTime(),
  ): Promise<CandleInfoModel[]> => {
    const pair = symbol.replace('/', '');

    const res = await fetch(this.getCandlesUrl(pair, this.chartTimeframes[interval], endTime));
    const resData = await res.json();

    return resData.map((obj: (string | number)[]) => {
      return new CandleInfoModel({
        time: Number(obj[0]),
        open: +obj[1],
        high: +obj[2],
        low: +obj[3],
        close: +obj[4],
        volume: +obj[5],
      });
    });
  };

  public getTradesHistory = async (symbol: TradeSymbol): Promise<TradeInfoModel[]> => {
    try {
      const res = await fetch(this.getTradesUrl(symbol));
      const rawData: BinanceTradeDto[] = await res.json();

      return rawData.map(
        (tradeItemDto) =>
          new TradeInfoModel({
            id: tradeItemDto.id,
            side: tradeItemDto.isBuyerMaker ? TradeSide.SELL : TradeSide.BUY,
            time: tradeItemDto.time,
            price: +tradeItemDto.price,
            amount: +tradeItemDto.qty,
            symbol,
            exchange: this.key,
          }),
      );
    } catch (error) {
      return [];
    }
  };

  public getOrderBook = async (symbol: string): Promise<OrderBookUpdateInfo> => {
    const res = await fetch(this.getOrderBookUrl(symbol));
    const resData: OrderBookSnapshotDto = await res.json();

    const asksBook: [Price, TradeVolume][] = resData.asks.map((r) => [+r[0], +r[1]]);
    const bidsBook: [Price, TradeVolume][] = resData.bids.map((r) => [+r[0], +r[1]]);

    const data: OrderBookUpdateInfo = {
      asks: asksBook,
      bids: bidsBook,
      type: OrderBookUpdateType.SNAPSHOT,
      exchange: this.key,
      symbol,
    };

    return data;
  };
}
