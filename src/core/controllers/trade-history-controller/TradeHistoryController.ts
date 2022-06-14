import signals from 'signals';
import { TradeInfoModel } from 'core/models';
import { ExchangeProvider } from 'core/ports';
import { ExchangeService } from 'core/services';
import { Inject, Service } from 'typedi';
import { TradeInfoAddedHandler } from 'core/types';
import type { Logger } from 'core/ports';

@Service()
export class TradeHistoryController {
  @Inject('Logger')
  private logger!: Logger;

  private tradeAdded: signals.Signal<TradeInfoModel> = new signals.Signal();

  constructor(private exchangeService: ExchangeService) {
    this.exchangeService.onExchangeUpdate(async (exchange) => {
      exchange.onTradeUpdate(this.exchangeService.getCurrentPair(), this.pushTradeInfo);
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
}
