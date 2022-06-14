import { action, computed, makeObservable, observable } from 'mobx';
import { Inject, Service } from 'typedi';
import { ExchangeController, PairListController } from 'core/controllers';
import { PairListModel } from 'core/models';

@Service()
export class PairViewController {
  @observable activePair: TradeSymbol;
  @observable pairList: PairListModel | null = null;
  @observable pairsBarOpen = false;
  @observable searchPairValue: string = '';
  @observable activeMarket = 'BTC';

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

  getPairList = async () => {
    const pairList = await this.pairListController.getPairList();
    this.updatePairList(pairList);
  };

  setActivePair = (pair: TradeSymbol) => {
    this.exchangeController.setActivePair(pair);
  };

  @action
  setPairsBarOpen = (value: boolean) => {
    this.pairsBarOpen = value;
  };

  @action
  setSearchPairValue = (value: string) => {
    this.searchPairValue = value;
  };

  @action
  setActiveMarket = (market: string) => {
    this.activeMarket = market;
  };

  @computed
  get markets(): string[] {
    return this.pairList?.mapped.markets ?? [];
  }
}
