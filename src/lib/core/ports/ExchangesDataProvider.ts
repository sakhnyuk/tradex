import { ExchangeProvider } from 'lib/core/ports';
import { ExchangeName } from 'lib/core/types';

export interface ExchangesDataProvider {
  getExchangesNameList: () => string[];
  getExchange: (exchangeName: ExchangeName) => ExchangeProvider;
  getDefaultExchange: () => ExchangeProvider;
  getAllSupportedExchanges: () => Record<string, ExchangeProvider>;
}
