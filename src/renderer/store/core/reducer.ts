import { createAction, createReducer } from 'redux-act';

import { storeVersion } from '../../appConstant';
import { CoreReducer, SetToCore } from './types';

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
export const setToCore = createAction<SetToCore>('core/setOnline');

// Saga starter actions
export const fetchCoinIcons = createAction('core/fetchCoinIcons');
export const sendFeedback = createAction('core/sendFeedback');

// Creating reducer
const coreReducer = createReducer<CoreReducer>({}, initialState).on(setToCore, (state, payload: SetToCore) => ({
  ...state,
  ...payload,
}));

export default coreReducer;
