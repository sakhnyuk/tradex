import { Service } from 'typedi';
import { ExchangeEntity, ExchangesDataProvider, Logger } from 'core/ports';
import { Exchange } from 'core/adapters';

@Service()
export class ExchangeController {
  private currentExchange: ExchangeEntity;

  private activeSymbol: TradeSymbol;

  private changeExchangeListeners: ((exchange: ExchangeEntity) => void)[] = [];

  constructor(private exchangeProvider: ExchangesDataProvider, private logger: Logger) {
    this.currentExchange = exchangeProvider.getDefaultExchange();
    this.activeSymbol = this.currentExchange.getDefaultSymbol();
  }

  get exchangeName(): string {
    return this.currentExchange.getName();
  }

  init = (): void => {
    this.currentExchange.connect();
  };

  public setActiveSymbol(symbol: TradeSymbol): void {
    this.activeSymbol = symbol;
  }

  public switchExchange = (exchangeName: Exchange): void => {
    const newExchange = this.exchangeProvider.getExchange(exchangeName);

    if (!newExchange) {
      this.logger.error('No Exchange');
      return;
    }

    this.currentExchange = newExchange;
    this.changeExchangeListeners.forEach((handler) => handler(newExchange));
  };
}
