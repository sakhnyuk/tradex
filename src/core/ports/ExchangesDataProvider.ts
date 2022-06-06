import { ExchangeEntity } from 'core/ports';

export interface ExchangesDataProvider {
  getExchangesNameList: () => string[];
  getExchange: (exchangeName: string) => ExchangeEntity;
  getDefaultExchange: () => ExchangeEntity;
  getAllSupportedExchanges: () => Record<string, ExchangeEntity>;
}
