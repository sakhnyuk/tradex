import { ExchangeProvider, ExchangesDataProvider, Logger } from 'core/ports';
import { ExchangeName } from 'core/types';
import { Inject, Service } from 'typedi';
import { BinanceAdapter } from './entities/binance/BinanceAdapter';

@Service({ name: 'ExchangesDataProvider' })
export class ExchangesProviderAdapter implements ExchangesDataProvider {
  @Inject('Logger')
  private logger!: Logger;

  private exchanges: Record<ExchangeName, ExchangeProvider>;

  private readonly defaultExchangeName = ExchangeName.BINANCE;

  constructor() {
    this.exchanges = {
      binance: new BinanceAdapter(),
    };
  }

  public getExchangesNameList = (): string[] => {
    return Object.values(this.exchanges).map((exchange) => exchange.getName());
  };

  public getExchange = (exchangeName: string): ExchangeProvider => {
    const exchangeAdapter = this.exchanges[exchangeName];

    if (!exchangeAdapter) {
      const error = new Error('No exchange');
      this.logger.error(error.message);
      throw error;
    }

    return exchangeAdapter;
  };

  public getDefaultExchange = (): ExchangeProvider => {
    return this.exchanges[this.defaultExchangeName];
  };

  public getAllSupportedExchanges = (): Record<ExchangeName, ExchangeProvider> => {
    return this.exchanges;
  };
}
