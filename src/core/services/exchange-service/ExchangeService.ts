import { Inject, Service } from 'typedi';
import signals from 'signals';
import { ExchangeProvider } from 'core/ports';
import { ExchangeName, ExchangeUpdateHandler, SymbolUpdateHandler } from 'core/types';
import type { ExchangesDataProvider, Logger } from 'core/ports';

/**
 * ExchangeService responsible to
 * - connect to exchanges,
 * - accepts commands to switch active exchange and symbols
 * - subscribes to events on update exchange and symbol
 */
@Service()
export class ExchangeService {
  private currentExchange: ExchangeProvider;

  private activeExchangeChanged: signals.Signal<ExchangeProvider> = new signals.Signal();

  constructor(
    @Inject('ExchangesDataProvider') private exchangesProvider: ExchangesDataProvider,
    @Inject('Logger') private logger: Logger,
  ) {
    this.currentExchange = this.exchangesProvider.getDefaultExchange();
    this.activeExchangeChanged.memorize = true;
  }

  get exchangeName(): ExchangeName {
    return this.currentExchange.getName() as ExchangeName;
  }

  public getSupportedExchanges(): Record<string, ExchangeProvider> {
    return this.exchangesProvider.getAllSupportedExchanges();
  }

  public getCurrentExchange(): ExchangeProvider {
    return this.currentExchange;
  }

  public onExchangeUpdate(handler: ExchangeUpdateHandler): void {
    this.activeExchangeChanged.add(handler);
  }

  public setActiveExchange(exchangeName: ExchangeName): void {
    const newExchange = this.exchangesProvider.getExchange(exchangeName);

    if (!newExchange) {
      this.logger.error('No Exchange');
      return;
    }

    this.currentExchange = newExchange;
    this.activeExchangeChanged.dispatch(newExchange);
  }
}
