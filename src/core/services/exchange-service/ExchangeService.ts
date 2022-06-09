import { Inject, Service } from 'typedi';
import signals from 'signals';
import { ExchangeProvider, ExchangesDataProvider, Logger } from 'core/ports';
import { ExchangeName } from 'core/adapters';
import { ExchangeUpdateHandler, SymbolUpdateHandler } from 'core/types';

/**
 * ExchangeService responsible to
 * - connect to exchanges,
 * - accepts commands to switch active exchange and symbols
 * - subscribes to events on update exchange and symbol
 */
@Service()
export class ExchangeService {
  @Inject('Logger')
  private logger!: Logger;

  @Inject('ExchangesDataProvider')
  private exchangesProvider!: ExchangesDataProvider;

  private currentExchange: ExchangeProvider;

  private activeSymbol: TradeSymbol;

  private activeExchangeChanged: signals.Signal<ExchangeProvider> = new signals.Signal();

  private activeSymbolChanged: signals.Signal<TradeSymbol> = new signals.Signal();

  constructor() {
    this.currentExchange = this.exchangesProvider.getDefaultExchange();
    this.activeSymbol = this.currentExchange.getDefaultSymbol();

    this.activeExchangeChanged.memorize = true;
    this.activeSymbolChanged.memorize = true;
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

  public getCurrentSymbol(): TradeSymbol {
    return this.activeSymbol;
  }

  public onExchangeUpdate(handler: ExchangeUpdateHandler): void {
    this.activeExchangeChanged.add(handler);
  }

  public onSymbolUpdate(handler: SymbolUpdateHandler): void {
    this.activeSymbolChanged.add(handler);
  }

  public setActiveExchange(exchangeName: ExchangeName): void {
    const newExchange = this.exchangesProvider.getExchange(exchangeName);

    if (!newExchange) {
      this.logger.error('No Exchange');
      return;
    }

    this.currentExchange = newExchange;
    this.activeExchangeChanged.dispatch(newExchange);
    this.activeSymbolChanged.dispatch(newExchange.getDefaultSymbol());
  }

  public setActiveSymbol(symbol: TradeSymbol): void {
    this.activeSymbol = symbol;
  }
}
