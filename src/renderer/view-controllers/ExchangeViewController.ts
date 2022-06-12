import { action, makeObservable, observable } from 'mobx';
import { Inject, Container, Service } from 'typedi';
import { ExchangeController, ExchangesListController } from 'core/controllers';
import { ExchangeName } from 'core/types';

@Service()
export class ExchangeViewController {
  @observable activeExchange: ExchangeName;
  @observable supportedExchanges: ExchangeName[];

  constructor(
    @Inject() private exchangeController: ExchangeController,
    @Inject() private exchangesListController: ExchangesListController,
  ) {
    makeObservable(this);
    this.activeExchange = this.exchangeController.getActiveExchangeName();
    this.supportedExchanges = this.exchangesListController.exchangesList;
    this.exchangeController.onExchangeUpdate(this.updateActiveExchange);
  }

  @action
  updateActiveExchange = (exchangeName: ExchangeName) => {
    this.activeExchange = exchangeName;
  };

  setActiveExchange = (exchangeName: ExchangeName) => {
    this.exchangeController.setExchange(exchangeName);
  };
}
