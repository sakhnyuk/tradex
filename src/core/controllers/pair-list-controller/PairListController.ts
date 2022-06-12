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
  @Inject()
  private exchangeService!: ExchangeService;

  @Inject('Logger')
  private logger!: Logger;

  pairListChanged: signals.Signal<PairListModel> = new signals.Signal();

  constructor() {
    this.exchangeService.onExchangeUpdate(async (exchange) => {
      const newPairList = await exchange.getPairs();
      this.logger.info('PairListUpdated', newPairList.getDto());
      this.pairListChanged.dispatch(newPairList);
    });
  }

  private get currentExchange(): ExchangeProvider {
    return this.exchangeService.getCurrentExchange();
  }

  public getCurrentSymbol = (): TradeSymbol => {
    return this.exchangeService.getCurrentSymbol();
  };

  public getPairList = (): Promise<PairListModel> => {
    return this.currentExchange.getPairs();
  };

  public onPairListUpdate = (handler: PairListUpdateHandler): void => {
    this.pairListChanged.add(handler);
  };
}
