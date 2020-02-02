import { Store } from '../types';

export const selectIsOnline = (state: Store) => state.core.isOnline;
export const selectReload = (state: Store) => state.core.reloadChart;
export const selectTheme = (state: Store) => state.core.theme;
export const selectIcons = (state: Store) => state.core.icons;
export const selectIsMac = (state: Store) => state.core.isMac;

// ui state
export const selectSettingsPage = (state: Store) => state.core.settingPage;
export const selectIsSettingsOpen = (state: Store) => state.core.settingOpen;
export const selectIsPairBarOpen = (state: Store) => state.core.pairsBarOpen;
export const selectHistoryComponent = (state: Store) => state.core.historyComponent;
export const selectShowAllAccounts = (state: Store) => state.core.showAllAccounts;
export const selectShowAllPositions = (state: Store) => state.core.showAllPositions;
export const selectShowAllPairs = (state: Store) => state.core.showAllPairs;
export const selectOrderBookIsLoading = (state: Store) => state.core.orderBookIsLoading;
export const selectTradesIsLoading = (state: Store) => state.core.tradesIsLoading;
export const selectPairListSorting = (state: Store) => state.core.pairListSorting;
