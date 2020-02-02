import { RouterState } from 'connected-react-router';
import { CoreReducer } from './core/types';

export interface Store {
  core: CoreReducer;
  router: RouterState;
}
