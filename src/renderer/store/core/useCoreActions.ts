import { useMemo } from 'react';
import { useDispatch } from 'react-redux';

import * as act from './reducer';
import { TypeTheme } from '../../theme/interface';
import { SortingPairs } from './types';

export const useCoreActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => ({
    setOnline: (isOnline: boolean) => dispatch(act.setOnline(isOnline)),
    setReloadChart: (reloadChart: boolean) => dispatch(act.setReloadChart(reloadChart)),
    setTheme: (theme: TypeTheme) => dispatch(act.setTheme(theme)),
    setOpenSetting: (settingOpen: boolean) => dispatch(act.setOpenSetting(settingOpen)),
    setOpenPairsBar: (pairsBarOpen: boolean) => dispatch(act.setOpenPairsBar(pairsBarOpen)),
    setPageSetting: (settingPage: string) => dispatch(act.setPageSetting(settingPage)),
    setIcons: (icons: { [key: string]: string }) => dispatch(act.setIcons(icons)),
    setShowAllAccounts: (showAllAccounts: boolean) => dispatch(act.setShowAllAccounts(showAllAccounts)),
    setShowAllPositions:
      (showAllPositions: boolean) => dispatch(act.setShowAllPositions(showAllPositions)),
    setShowAllPairs: (showAllPairs: boolean) => dispatch(act.setShowAllPairs(showAllPairs)),
    setOrderBookIsLoading:
      (orderBookIsLoading: boolean) => dispatch(act.setOrderBookIsLoading(orderBookIsLoading)),
    setTradesIsLoading: (tradesIsLoading: boolean) => dispatch(act.setTradesIsLoading(tradesIsLoading)),
    setPairListSorting:
      (pairListSorting: SortingPairs) => dispatch(act.setPairListSorting(pairListSorting)),
  }), [dispatch]);
};
