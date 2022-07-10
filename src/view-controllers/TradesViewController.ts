import { action, makeObservable, observable } from 'mobx';
import { Inject, Service } from 'typedi';
import { ExchangeController, TradeHistoryController } from 'lib/core/controllers';
import { TradeInfoModel } from 'lib/core/models';

@Service()
export class TradesViewController {
  @observable trades: TradeInfoModel[] = [];
  @observable isLoading = true;

  constructor(
    @Inject() private exchangeController: ExchangeController,
    @Inject() private tradeHistoryController: TradeHistoryController,
  ) {
    makeObservable(this);

    this.exchangeController.addExchangeUpdateListener(this.resetTrades);
    this.exchangeController.addPairUpdateListener(this.resetTrades);

    this.tradeHistoryController.initTrades(this.addTrade);
  }

  @action
  private resetTrades = () => {
    this.isLoading = true;
    this.trades = [];
  };

  @action
  private addTrade = (trade: TradeInfoModel) => {
    this.trades.unshift(trade);
    if (this.trades.length > 100) {
      this.trades = this.trades.slice(0, 100);
    }

    this.isLoading = false;
  };
}
