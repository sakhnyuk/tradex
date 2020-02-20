import { RouterState } from 'connected-react-router';
import { CoreReducer } from './core/types';
import { ExchangeStore } from './exchange/types';
import { ChartStore } from './chart/types';
import { ExploreStore } from './explore/types';

export interface Store {
  core: CoreReducer;
  explore: ExploreStore;
  exchange: ExchangeStore;
  router: RouterState;
  chart: ChartStore;
}
