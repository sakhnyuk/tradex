import { combineReducers, Reducer } from 'redux';
import { connectRouter } from 'connected-react-router';

import { Store } from './types';
import { history as History } from './configureStore';
import coreReducer from './core/reducer';
import exchangeReducer from './exchange/reducer';
import chartReducer from './chart/reducer';

export const createRootReducer = (history: typeof History): Reducer<Store> =>
  combineReducers({
    core: coreReducer,
    exchange: exchangeReducer,
    router: connectRouter(history),
    chart: chartReducer,
  });
