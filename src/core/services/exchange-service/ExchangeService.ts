import { Inject, Service } from 'typedi';
import signals from 'signals';
import { ExchangeProvider } from 'core/ports';
import { ExchangeName, ExchangeUpdateHandler, PairUpdateHandler } from 'core/types';
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

  private currentPair: TradeSymbol;

  private currentExchangeChanged: signals.Signal<ExchangeProvider> = new signals.Signal();

  private currentPairChanged: signals.Signal<TradeSymbol> = new signals.Signal();

  constructor(
    @Inject('ExchangesDataProvider') private exchangesProvider: ExchangesDataProvider,
    @Inject('Logger') private logger: Logger,
  ) {
    this.currentExchange = this.exchangesProvider.getDefaultExchange();
    this.currentPair = this.currentExchange.getDefaultSymbol();
  }

  get exchangeName(): ExchangeName {
    return this.currentExchange.getName();
  }

  public getSupportedExchanges(): Record<string, ExchangeProvider> {
    return this.exchangesProvider.getAllSupportedExchanges();
  }

  public getCurrentExchangeRepository(): ExchangeProvider {
    return this.currentExchange;
  }

  public getCurrentPair(): TradeSymbol {
    return this.currentPair;
  }

  public onExchangeUpdate(handler: ExchangeUpdateHandler): void {
    this.currentExchangeChanged.add(handler);
  }

  public onPairUpdate(handler: PairUpdateHandler): void {
    this.currentPairChanged.add(handler);
  }

  public setActiveExchange(exchangeName: ExchangeName): void {
    const newExchange = this.exchangesProvider.getExchange(exchangeName);

    if (!newExchange) {
      this.logger.error('No Exchange');
      return;
    }

    this.currentExchange = newExchange;
    this.currentExchangeChanged.dispatch(newExchange);
    this.currentPairChanged.dispatch(newExchange.getDefaultSymbol());
  }

  public setActivePair(pair: TradeSymbol): void {
    this.currentPair = pair;
    this.currentPairChanged.dispatch(pair);
  }
}
