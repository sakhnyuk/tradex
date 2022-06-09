import { ExchangeProvider } from 'core/ports';

export interface ExchangesDataProvider {
  getExchangesNameList: () => string[];
  getExchange: (exchangeName: string) => ExchangeProvider;
  getDefaultExchange: () => ExchangeProvider;
  getAllSupportedExchanges: () => Record<string, ExchangeProvider>;
}
