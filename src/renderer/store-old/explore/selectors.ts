import { createSelector } from 'reselect';
import { Store } from '../types';

const getExchange = (store: Store) => store.explore.exchanges[store.explore.activeExchange];

class ExploreSelect {
  activeExchange = (store: Store) => store.explore.activeExchange;

  activePair = (store: Store) => getExchange(store).activePair;

  exchangesList = createSelector(
    (store: Store) => store.explore.exchanges,
    exchanges => Object.values(exchanges),
  );
}

export const exploreSelect = new ExploreSelect();
