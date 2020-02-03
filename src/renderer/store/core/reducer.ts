import { createAction, createReducer } from 'redux-act';

import { storeVersion } from '../../appConstant';
import { CoreReducer, SetToCore, SortingPairs } from './types';
import { TypeTheme } from '../../theme/interface';

const initialState: CoreReducer = {
  isMac: process.platform === 'darwin',
  isOnline: true,
  reloadChart: false,
  storeVersion,
  theme: 'dark',
  icons: {},
  settingOpen: false,
  settingPage: 'exchanges',
  pairsBarOpen: false,
  supportedIntervals: [],
  historyComponent: 'balance',
  activeOrderType: 'limit',
  showAllAccounts: false,
  showAllPairs: false,
  showAllPositions: false,
  orderBookIsLoading: false,
  tradesIsLoading: false,
  pairListSorting: 'VolumeDescending',
};

// Actions
export const setOnline = createAction<boolean>('core/setOnline');
export const setToCore = createAction<SetToCore>('core/setOnline');
export const setReloadChart = createAction<boolean>('core/setReloadChart');
export const setTheme = createAction<TypeTheme>('core/setTheme');
export const setOpenSetting = createAction<boolean>('core/setOpenSetting');
export const setOpenPairsBar = createAction<boolean>('core/setOpenPairsBar');
export const setPageSetting = createAction<string>('core/setPageSetting');
export const setIcons = createAction<{ [key: string]: string }>('core/setIcons');
export const setShowAllAccounts = createAction<boolean>('core/setShowAllAccounts');
export const setShowAllPositions = createAction<boolean>('core/setShowAllPositions');
export const setShowAllPairs = createAction<boolean>('core/setShowAllPairs');
export const setOrderBookIsLoading = createAction<boolean>('core/setOrderBookIsLoading');
export const setTradesIsLoading = createAction<boolean>('core/setTradesIsLoading');
export const setPairListSorting = createAction<SortingPairs>('core/setPairListSorting');

// Saga starter actions
export const fetchCoinIcons = createAction('core/fetchCoinIcons');
export const sendFeedback = createAction('core/sendFeedback');

// Creating reducer
const coreReducer = createReducer<CoreReducer>({}, initialState)
  .on(setToCore, (state, payload: SetToCore) => ({
    ...state,
    ...payload,
  }))
  .on(setOnline, (state, isOnline: boolean) => ({ ...state, isOnline }))
  .on(setReloadChart, (state, reloadChart: boolean) => ({ ...state, reloadChart }))
  .on(setTheme, (state, theme: TypeTheme) => ({ ...state, theme }))
  .on(setOpenSetting, (state, settingOpen: boolean) => ({ ...state, settingOpen }))
  .on(setOpenPairsBar, (state, pairsBarOpen: boolean) => ({ ...state, pairsBarOpen }))
  .on(setPageSetting, (state, settingPage: string) => ({ ...state, settingPage }))
  .on(setIcons, (state, icons: { [key: string]: string }) => ({ ...state, icons }))
  .on(setShowAllAccounts, (state, showAllAccounts: boolean) => ({ ...state, showAllAccounts }))
  .on(setShowAllPositions, (state, showAllPositions: boolean) => ({ ...state, showAllPositions }))
  .on(setShowAllPairs, (state, showAllPairs: boolean) => ({ ...state, showAllPairs }))
  .on(setOrderBookIsLoading, (state, orderBookIsLoading: boolean) => ({ ...state, orderBookIsLoading }))
  .on(setTradesIsLoading, (state, tradesIsLoading: boolean) => ({ ...state, tradesIsLoading }))
  .on(setPairListSorting, (state, pairListSorting: SortingPairs) => ({ ...state, pairListSorting }));

export default coreReducer;
