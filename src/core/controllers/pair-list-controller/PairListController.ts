import { Inject, Service } from 'typedi';
import signals from 'signals';
import { PairListModel } from 'core/models';
import { ExchangeProvider } from 'core/ports';
import { ExchangeService } from 'core/services';
import { PairListUpdateHandler } from 'core/types';
import type { Logger } from 'core/ports';

/**
 * Stateless controller for getting and update pair list.
 */
@Service()
export class PairListController {
  @Inject('Logger')
  private logger!: Logger;

  pairListChanged: signals.Signal<PairListModel> = new signals.Signal();

  constructor(@Inject() private exchangeService: ExchangeService) {
    this.exchangeService.onExchangeUpdate(async (exchange) => {
      const newPairList = await exchange.getPairs();
      this.logger.info('PairListUpdated', newPairList.getDto());
      this.pairListChanged.dispatch(newPairList);
    });
  }

  private get exchangeRepository(): ExchangeProvider {
    return this.exchangeService.getCurrentExchangeRepository();
  }

  public getPairList = (): Promise<PairListModel> => {
    return this.exchangeRepository.getPairs();
  };

  public addPairListUpdateListener = (handler: PairListUpdateHandler): void => {
    this.pairListChanged.add(handler);
  };
}
