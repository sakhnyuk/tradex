import { ExchangeController } from 'core/controllers';
import Container, { Inject, Service } from 'typedi';

@Service()
export class AppTest {
  constructor(private exchangeController: ExchangeController) {}

  start = () => {
    console.log(this.exchangeController.getActiveExchangeName());
    console.log(this.exchangeController.getActivePair());
  };
}
