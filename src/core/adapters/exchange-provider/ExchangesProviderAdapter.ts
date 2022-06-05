import { ExchangeEntity, ExchangesDataProvider, Logger } from 'core/ports';
import { Service } from 'typedi';
import { BinanceAdapter } from './entities/binance/BinanceAdapter';
import { Exchange } from './types';

@Service()
export class ExchangesProviderAdapter implements ExchangesDataProvider {
  private exchanges: Record<Exchange, ExchangeEntity>;

  private readonly defaultExchangeName = Exchange.BINANCE;

  constructor(private logger: Logger) {
    this.exchanges = {
      binance: new BinanceAdapter(),
    };
  }

  public getExchangesNameList = (): string[] => {
    return Object.values(this.exchanges).map((exchange) => exchange.getName());
  };

  public getExchange = (exchangeName: string): ExchangeEntity => {
    const exchangeAdapter = this.exchanges[exchangeName];

    if (!exchangeAdapter) {
      const error = new Error('No exchange');
      this.logger.error(error.message);
      throw error;
    }

    return exchangeAdapter;
  };

  public getDefaultExchange = (): ExchangeEntity => {
    return this.exchanges[this.defaultExchangeName];
  };

  public getAllSupportedExchanges = (): Record<Exchange, ExchangeEntity> => {
    return this.exchanges;
  };
}
