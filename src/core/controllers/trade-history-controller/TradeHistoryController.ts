import signals from 'signals';
import { TradeInfoModel } from 'core/models';
import { ExchangeProvider, Logger } from 'core/ports';
import { ExchangeService } from 'core/services';
import { Inject, Service } from 'typedi';
import { TradeInfoAddedHandler } from 'core/types';

@Service()
export class TradeHistoryController {
  @Inject('Logger')
  private logger!: Logger;

  private tradeAdded: signals.Signal<TradeInfoModel> = new signals.Signal();

  constructor(private exchangeService: ExchangeService) {
    this.exchangeService.onExchangeUpdate(async (exchange) => {
      exchange.onTradeUpdate(this.exchangeService.getCurrentSymbol(), this.pushTradeInfo);
    });
  }

  private get currentExchange(): ExchangeProvider {
    return this.exchangeService.getCurrentExchange();
  }

  private pushTradeInfo = (tradeInfo: TradeInfoModel): void => {
    this.tradeAdded.dispatch(tradeInfo);
  };

  public initTrades = (handler: TradeInfoAddedHandler): void => {
    this.currentExchange.onTradeUpdate(this.exchangeService.getCurrentSymbol(), this.pushTradeInfo);
    this.onAddTrade(handler);
  };

  public onAddTrade = (handler: TradeInfoAddedHandler): void => {
    this.tradeAdded.add(handler);
  };
}
