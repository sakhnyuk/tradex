import { combineReducers, Reducer } from 'redux';
import { connectRouter } from 'connected-react-router';

import { Store } from './types';
import coreReducer from './core/reducer';
import { history as History } from './configureStore';

export const createRootReducer = (history: typeof History): Reducer<Store> =>
  combineReducers({
    router: connectRouter(history),
    core: coreReducer,
  });
