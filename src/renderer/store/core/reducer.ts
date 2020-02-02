import { createAction, createReducer } from 'redux-act';
import { storeVersion } from '../../appConstant';
import { CoreReducer } from './types';
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
export const setOnline = createAction('core/setOnline');
export const setReloadChart = createAction('core/setReloadChart');
export const changeTheme = createAction('core/changeTheme');
export const openCloseSetting = createAction('core/openCloseSetting');
export const openClosePairsBar = createAction('core/openClosePairsBar');
export const changePageSetting = createAction('core/changePageSetting');
export const setIcons = createAction<{ [key: string]: string }>('core/setIcons');
export const setShowAllAccounts = createAction('core/setShowAllAccounts');
export const setShowAllPositions = createAction('core/setShowAllPositions');
export const setShowAllPairs = createAction('core/setShowAllPairs');
export const setOrderBookIsLoading = createAction('core/setOrderBookIsLoading');
export const setTradesIsLoading = createAction('core/setTradesIsLoading');
export const setPairListSorting = createAction('core/setPairListSorting');

// Saga starter actions
export const fetchCoinIcons = createAction('core/fetchCoinIcons');
export const sendFeedback = createAction('core/sendFeedback');

// Creating reducer
const coreReducer = createReducer<CoreReducer>({}, initialState)
  .on(setOnline, (state, isOnline: boolean) => ({ ...state, isOnline }))
  .on(setReloadChart, (state, reloadChart: boolean) => ({ ...state, reloadChart }))
  .on(changeTheme, (state, theme: TypeTheme) => ({ ...state, theme }))
  .on(openCloseSetting, (state, settingOpen: boolean) => ({ ...state, settingOpen }))
  .on(openClosePairsBar, (state, pairsBarOpen: boolean) => ({ ...state, pairsBarOpen }))
  .on(changePageSetting, (state, settingPage: string) => ({ ...state, settingPage }))
  .on(setIcons, (state, icons: { [key: string]: string }) => ({ ...state, icons }))
  .on(setShowAllAccounts, (state, showAllAccounts: boolean) => ({ ...state, showAllAccounts }))
  .on(setShowAllPositions, (state, showAllPositions: boolean) => ({ ...state, showAllPositions }))
  .on(setShowAllPairs, (state, showAllPairs: boolean) => ({ ...state, showAllPairs }))
  .on(setOrderBookIsLoading, (state, orderBookIsLoading: boolean) => ({ ...state, orderBookIsLoading }))
  .on(setTradesIsLoading, (state, tradesIsLoading: boolean) => ({ ...state, tradesIsLoading }))
  .on(setPairListSorting, (state, pairListSorting: string) => ({ ...state, pairListSorting }));

export default coreReducer;
