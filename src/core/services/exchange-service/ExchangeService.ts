import { Service } from 'typedi';
import { ExchangeEntity, ExchangesDataProvider, Logger } from 'core/ports';
import { Exchange } from 'core/adapters';
import { ExchangeUpdateHandler, SymbolUpdateHandler } from 'core/types';

/**
 * ExchangeService responsible to
 * - connect to exchanges,
 * - accepts commands to switch active exchange and symbols
 * - subscribes to events on update exchange and symbol
 */
@Service()
export class ExchangeService {
  private currentExchange: ExchangeEntity;

  private activeSymbol: TradeSymbol;

  private updateExchangeListeners: ExchangeUpdateHandler[] = [];

  private updateSymbolListeners: SymbolUpdateHandler[] = [];

  constructor(private exchangesProvider: ExchangesDataProvider, private logger: Logger) {
    this.currentExchange = this.exchangesProvider.getDefaultExchange();
    this.activeSymbol = this.currentExchange.getDefaultSymbol();
  }

  get exchangeName(): string {
    return this.currentExchange.getName();
  }

  private emitUpdateExchangeEvent(exchange: ExchangeEntity): void {
    this.updateExchangeListeners.forEach((handler) => handler(exchange));
  }

  private emitUpdateSymbolEvent(symbol: TradeSymbol): void {
    this.updateSymbolListeners.forEach((handler) => handler(symbol));
  }

  public getSupportedExchanges(): Record<string, ExchangeEntity> {
    return this.exchangesProvider.getAllSupportedExchanges();
  }

  public getCurrentExchange(): ExchangeEntity {
    return this.currentExchange;
  }

  public getCurrentSymbol(): TradeSymbol {
    return this.activeSymbol;
  }

  public addExchangeUpdateListener(handler: ExchangeUpdateHandler): void {
    this.updateExchangeListeners.push(handler);
  }

  public addSymbolUpdateListener(handler: SymbolUpdateHandler): void {
    this.updateSymbolListeners.push(handler);
  }

  public setActiveExchange(exchangeName: Exchange): void {
    const newExchange = this.exchangesProvider.getExchange(exchangeName);

    if (!newExchange) {
      this.logger.error('No Exchange');
      return;
    }

    this.currentExchange = newExchange;
    this.emitUpdateExchangeEvent(newExchange);
    this.emitUpdateSymbolEvent(newExchange.getDefaultSymbol());
  }

  public setActiveSymbol(symbol: TradeSymbol): void {
    this.activeSymbol = symbol;
  }
}
