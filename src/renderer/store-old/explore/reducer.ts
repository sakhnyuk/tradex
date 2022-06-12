import { createAction, createReducer } from 'redux-act';
import set from 'lodash/fp/set';

import { exchangePairs, exchanges } from '../../appConstant';
import { InitialExchangeData, SetExplorePairAndExchange, ExploreStore } from './types';

const initialExchanges: { [exchange: string]: InitialExchangeData } = {};

exchanges.forEach(exchange => {
  initialExchanges[exchange] = {
    name: exchange,
    activePair: exchangePairs[exchange],
  };
});

const initialState: ExploreStore = {
  activeExchange: 'binance',
  exchanges: initialExchanges,
};

export const setExplorePairAndExchange = createAction<SetExplorePairAndExchange>('explore/setExplorePairAndExchange');

const exploreReducer = createReducer<ExploreStore>({}, initialState).on(
  setExplorePairAndExchange,
  (state, { exchange, pair }) => {
    let newState = state;
    newState = set('activeExchange', exchange, newState);
    newState = set(['exchanges', exchange, 'activePair'], pair, newState);

    return newState;
  },
);

export default exploreReducer;
