import { ExchangeName } from 'core/adapters';
import { ExchangeService } from 'core/services';
import { Inject, Service } from 'typedi';
import signals from 'signals';
import { ExchangeNameUpdateHandler } from 'core/types';

/**
 * Provides data of supported exchanges and handler to switch active exchange
 */
@Service()
export class ExchangesListController {
  @Inject()
  private exchangeService!: ExchangeService;

  private activeExchange: ExchangeName;

  private exchangeChanged: signals.Signal<ExchangeName> = new signals.Signal();

  constructor() {
    this.activeExchange = this.exchangeService.exchangeName;

    this.exchangeService.onExchangeUpdate(() => {
      this.activeExchange = this.exchangeService.exchangeName;
    });
  }

  public getActiveExchangeName = (): ExchangeName => {
    return this.activeExchange;
  };

  public onExchangeUpdate = (handler: ExchangeNameUpdateHandler): void => {
    this.exchangeChanged.add(handler);
  };

  public setExchange = (exchangeName: ExchangeName): void => {
    this.exchangeService.setActiveExchange(exchangeName);
  };

  get exchangesList(): ExchangeName[] {
    const exchanges = this.exchangeService.getSupportedExchanges();

    // Type cast for keeping core app away from possible exchanges from adapters
    return Object.values(exchanges).map((exchange) => exchange.getName() as ExchangeName);
  }
}
