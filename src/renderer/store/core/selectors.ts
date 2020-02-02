import { Store } from '../types';

export const selectCoreStore = (state: Store) => state.core;

export const selectCore = {
  store: (state: Store) => state.core,
  isOnline: (state: Store) => state.core.isOnline,
  reloadChart: (state: Store) => state.core.reloadChart,
  theme: (state: Store) => state.core.theme,
  icons: (state: Store) => state.core.icons,
  isMac: (state: Store) => state.core.isMac,

  // ui state
  settingPage: (state: Store) => state.core.settingPage,
  settingOpen: (state: Store) => state.core.settingOpen,
  pairsBarOpen: (state: Store) => state.core.pairsBarOpen,
  historyComponent: (state: Store) => state.core.historyComponent,
  showAllAccounts: (state: Store) => state.core.showAllAccounts,
  showAllPositions: (state: Store) => state.core.showAllPositions,
  showAllPairs: (state: Store) => state.core.showAllPairs,
  orderBookIsLoading: (state: Store) => state.core.orderBookIsLoading,
  tradesIsLoading: (state: Store) => state.core.tradesIsLoading,
  pairListSorting: (state: Store) => state.core.pairListSorting,
};
