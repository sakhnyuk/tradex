import { action, makeObservable, observable } from 'mobx';
import { Inject, Container, Service } from 'typedi';
import { ExchangeController } from 'core/controllers';
import { ExchangeName } from 'core/types';

@Service()
export class ExchangeStore {
  @observable activePair: TradeSymbol;
  @observable activeExchange: ExchangeName;

  constructor(@Inject() private exchangeController: ExchangeController) {
    makeObservable(this);

    this.activePair = this.exchangeController.getActivePair();
    this.activeExchange = this.exchangeController.getActiveExchangeName();

    this.exchangeController.onPairUpdate((pair) => {
      this.activePair = pair;
    });

    this.exchangeController.onExchangeUpdate((exchangeName) => {
      this.activeExchange = exchangeName;
    });
  }

  setActivePair = (pair: TradeSymbol) => {
    this.exchangeController.setActivePair(pair);
  };

  setActiveExchange = (exchangeName: ExchangeName) => {
    this.exchangeController.setExchange(exchangeName);
  };
}
