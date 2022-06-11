import signals from 'signals';
import { Inject, Service } from 'typedi';
import { OrderBookModel, OrderBookParsedDto, OrderBookUpdateInfo } from 'core/models';
import { ExchangeProvider, Logger } from 'core/ports';
import { ExchangeService } from 'core/services';
import { OrderBookUpdateHandler, OrderBookUpdateType } from 'core/types';
import { parseTotalAsks, parseTotalBids } from './parseOrderBookItem';
import { insertOrderBookUpdates } from './insertOrderBookUpdates';

@Service()
export class OrderBookController {
  private orderBookUpdated: signals.Signal<OrderBookModel> = new signals.Signal();

  private orderBook: OrderBookModel = new OrderBookModel({});

  constructor(private exchangeService: ExchangeService, @Inject('Logger') private logger: Logger) {
    this.exchangeService.onExchangeUpdate(async (exchange) => {
      exchange.onOrderBookUpdate(this.exchangeService.getCurrentSymbol(), this.pushOrderBookUpdate);
    });
  }

  private get currentExchange(): ExchangeProvider {
    return this.exchangeService.getCurrentExchange();
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

  public onOrderBookUpdate = (handler: OrderBookUpdateHandler): void => {
    this.orderBookUpdated.add(handler);
  };

  public initOrderBook = (handler: OrderBookUpdateHandler): void => {
    this.onOrderBookUpdate(handler);
    this.currentExchange.onOrderBookUpdate(this.exchangeService.getCurrentSymbol(), this.pushOrderBookUpdate);
  };
}
