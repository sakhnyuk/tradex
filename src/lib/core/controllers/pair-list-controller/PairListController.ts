import { Inject, Service } from 'typedi';
import signals from 'signals';
import { PairListModel } from 'lib/core/models';
import { ExchangeProvider } from 'lib/core/ports';
import { ExchangeService } from 'lib/core/services';
import { PairListUpdateHandler } from 'lib/core/types';
import type { Logger } from 'lib/core/ports';

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
