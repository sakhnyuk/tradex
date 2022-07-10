import { action, computed, makeObservable, observable } from 'mobx';
import { Inject, Service } from 'typedi';
import { ExchangeController, PairListController } from 'lib/core/controllers';
import { PairInfoModel, PairListModel } from 'lib/core/models';

@Service()
export class PairViewController {
  @observable activePair: TradeSymbol;
  @observable pairList: PairListModel | null = null;
  @observable searchPairValue: string = '';
  @observable activeMarket = 'BTC';

  listenerID?: number;

  constructor(
    @Inject() private exchangeController: ExchangeController,
    @Inject() private pairListController: PairListController,
  ) {
    makeObservable(this);

    this.activePair = this.exchangeController.getActivePair();
    this.exchangeController.addPairUpdateListener(this.updateActivePair);
    this.exchangeController.addExchangeUpdateListener(this.getPairList);
    this.pairListController.addPairListUpdateListener(this.updatePairList);
  }

  @action
  private updateActivePair = (pair: TradeSymbol) => {
    this.activePair = pair;
  };

  @action
  private updatePairList = (pairList: PairListModel) => {
    this.pairList = pairList;
  };

  public getPairList = async () => {
    const pairList = await this.pairListController.getPairList();
    this.updatePairList(pairList);
  };

  public subscribePairListUpdate = () => {
    this.listenerID = window.setInterval(() => {
      this.getPairList();
    }, 60000);
  };

  public unsubscribePairListUpdate = () => {
    if (this.listenerID) {
      clearInterval(this.listenerID);
    }
  };

  public setActivePair = (pair: TradeSymbol) => {
    this.exchangeController.setActivePair(pair);
  };

  @action
  public setSearchPairValue = (value: string) => {
    this.searchPairValue = value;
  };

  @action
  public setActiveMarket = (market: string) => {
    this.activeMarket = market;
  };

  @computed
  get markets(): string[] {
    return this.pairList?.mapped.markets ?? [];
  }

  @computed
  get activePairInfo(): PairInfoModel | undefined {
    return this.pairList?.fullList[this.activePair];
  }
}
