import { RouterState } from 'connected-react-router';
import { CoreReducer } from './core/types';
import { ExchangeStore } from './exchange/types';

export interface Store {
  core: CoreReducer;
  exchange: ExchangeStore;
  router: RouterState;
}
