import signals from 'signals';
import { Inject, Service } from 'typedi';
import { OrderBookModel, OrderBookParsedDto, OrderBookUpdateInfo } from 'lib/core/models';
import { ExchangeProvider } from 'lib/core/ports';
import { ExchangeService } from 'lib/core/services';
import { OrderBookUpdateHandler, OrderBookUpdateType } from 'lib/core/types';
import { parseTotalAsks, parseTotalBids } from './parseOrderBookItem';
import { insertOrderBookUpdates } from './insertOrderBookUpdates';
import type { Logger } from 'lib/core/ports';

@Service()
export class OrderBookController {
  private orderBookUpdated: signals.Signal<OrderBookModel> = new signals.Signal();

  private orderBook: OrderBookModel = new OrderBookModel({});

  constructor(@Inject() private exchangeService: ExchangeService, @Inject('Logger') private logger: Logger) {
    this.exchangeService.onExchangeUpdate((exchange) => {
      exchange.onOrderBookUpdate(this.exchangeService.getCurrentPair(), this.pushOrderBookUpdate);
    });

    this.exchangeService.onPairUpdate((pair) => {
      this.exchangeRepository.onOrderBookUpdate(pair, this.pushOrderBookUpdate);
    });
  }

  private get exchangeRepository(): ExchangeProvider {
    return this.exchangeService.getCurrentExchangeRepository();
  }

  private pushOrderBookUpdate = (orderBookInfo: OrderBookUpdateInfo): void => {
    let newAsks: [Price, TradeVolume][] = [];
    let newBids: [Price, TradeVolume][] = [];

    if (orderBookInfo.type === OrderBookUpdateType.SNAPSHOT) {
      this.logger.info('orderbook snapshot', orderBookInfo);
      newAsks = orderBookInfo.asks;
      newBids = orderBookInfo.bids;
    }

    if (orderBookInfo.type === OrderBookUpdateType.UPDATE) {
      this.logger.info('orderbook update', orderBookInfo);
      const { asks: oldAsks, bids: oldBids } = this.orderBook;

      newAsks = insertOrderBookUpdates(oldAsks, orderBookInfo.asks);
      newBids = insertOrderBookUpdates(oldBids, orderBookInfo.bids);
    }

    const { orderBookList: asks, baseTotal: asksTotalBase, quoteTotal: asksTotalQuote } = parseTotalAsks(newAsks);
    const { orderBookList: bids, baseTotal: bidsTotalBase, quoteTotal: bidsTotalQuote } = parseTotalBids(newBids);

    const orderBookDto: OrderBookParsedDto = {
      asks,
      asksTotalBase,
      asksTotalQuote,
      bids,
      bidsTotalBase,
      bidsTotalQuote,
    };

    this.orderBook = new OrderBookModel(orderBookDto);
    this.orderBookUpdated.dispatch(this.orderBook);
  };

  public addOrderBookUpdateListener = (handler: OrderBookUpdateHandler): void => {
    this.orderBookUpdated.add(handler);
  };

  public initOrderBook = (handler: OrderBookUpdateHandler): void => {
    this.addOrderBookUpdateListener(handler);
    this.exchangeRepository.onOrderBookUpdate(this.exchangeService.getCurrentPair(), this.pushOrderBookUpdate);
  };
}
