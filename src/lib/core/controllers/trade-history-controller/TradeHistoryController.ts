import signals from 'signals';
import { TradeInfoModel } from 'lib/core/models';
import { ExchangeProvider } from 'lib/core/ports';
import { ExchangeService } from 'lib/core/services';
import { Inject, Service } from 'typedi';
import { TradeInfoAddedHandler } from 'lib/core/types';
import type { Logger } from 'lib/core/ports';

@Service()
export class TradeHistoryController {
  @Inject('Logger')
  private logger!: Logger;

  private tradeAdded: signals.Signal<TradeInfoModel> = new signals.Signal();

  constructor(@Inject() private exchangeService: ExchangeService) {
    this.exchangeService.onExchangeUpdate(async (exchange) => {
      exchange.onTradeUpdate(this.exchangeService.getCurrentPair(), this.pushTradeInfo);
    });

    this.exchangeService.onPairUpdate(async (pair) => {
      this.currentExchange.closeTrade();
      this.currentExchange.onTradeUpdate(pair, this.pushTradeInfo);
    });
  }

  private get currentExchange(): ExchangeProvider {
    return this.exchangeService.getCurrentExchangeRepository();
  }

  private pushTradeInfo = (tradeInfo: TradeInfoModel): void => {
    this.tradeAdded.dispatch(tradeInfo);
  };

  public initTrades = (handler: TradeInfoAddedHandler): void => {
    this.addTradeUpdateListener(handler);
    this.currentExchange.onTradeUpdate(this.exchangeService.getCurrentPair(), this.pushTradeInfo);
  };

  public addTradeUpdateListener = (handler: TradeInfoAddedHandler): void => {
    this.tradeAdded.add(handler);
  };

  public removeTradeUpdateListener = (handler: TradeInfoAddedHandler): void => {
    this.tradeAdded.remove(handler);
  };
}
