import { ExchangeService } from 'core/services';
import { Inject, Service } from 'typedi';
import signals from 'signals';
import { ExchangeName, ExchangeUpdateHandler } from 'core/types';
import { ExchangeProvider } from 'core/ports';

/**
 * Provides data of supported exchanges and handler to switch active exchange
 */
@Service()
export class ExchangesListController {
  @Inject()
  private exchangeService!: ExchangeService;

  get exchangesList(): ExchangeName[] {
    const exchanges = this.exchangeService.getSupportedExchanges();

    // Type cast for keeping core app away from possible exchanges from adapters
    return Object.values(exchanges).map((exchange) => exchange.getName() as ExchangeName);
  }
}
