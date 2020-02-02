import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';

import { createHashHistory } from 'history';
import { createRootReducer } from './rootReducer';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const history = createHashHistory();

export const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const rootReducer = createRootReducer(history);

  const store = createStore(rootReducer, composeEnhancers(applyMiddleware(routerMiddleware(history), sagaMiddleware)));

  return store;
};
