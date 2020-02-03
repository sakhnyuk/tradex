import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import * as act from './reducer';
import { TypeTheme } from '../../theme/interface';
import { SortingPairs } from './types';

export const useCoreActions = () => {
  const dispatch = useDispatch();

  const actions = {
    setOnline: useCallback((isOnline: boolean) => dispatch(act.setToCore({ isOnline })), [dispatch]),
    setReloadChart: useCallback((reloadChart: boolean) => dispatch(act.setReloadChart(reloadChart)), [dispatch]),
    setTheme: useCallback((theme: TypeTheme) => dispatch(act.setTheme(theme)), [dispatch]),
    setOpenSetting: useCallback((settingOpen: boolean) => dispatch(act.setOpenSetting(settingOpen)), [dispatch]),
    setOpenPairsBar: useCallback((pairsBarOpen: boolean) => dispatch(act.setOpenPairsBar(pairsBarOpen)), [dispatch]),
    setPageSetting: useCallback((settingPage: string) => dispatch(act.setPageSetting(settingPage)), [dispatch]),
    setIcons: useCallback((icons: { [key: string]: string }) => dispatch(act.setIcons(icons)), [dispatch]),
    setShowAllAccounts: useCallback((showAllAccounts: boolean) => dispatch(act.setShowAllAccounts(showAllAccounts)), [
      dispatch,
    ]),
    setShowAllPositions: useCallback(
      (showAllPositions: boolean) => dispatch(act.setShowAllPositions(showAllPositions)),
      [dispatch],
    ),
    setShowAllPairs: useCallback((showAllPairs: boolean) => dispatch(act.setShowAllPairs(showAllPairs)), [dispatch]),
    setOrderBookIsLoading: useCallback(
      (orderBookIsLoading: boolean) => dispatch(act.setOrderBookIsLoading(orderBookIsLoading)),
      [dispatch],
    ),
    setTradesIsLoading: useCallback((tradesIsLoading: boolean) => dispatch(act.setTradesIsLoading(tradesIsLoading)), [
      dispatch,
    ]),
    setPairListSorting: useCallback(
      (pairListSorting: SortingPairs) => dispatch(act.setPairListSorting(pairListSorting)),
      [dispatch],
    ),
  };

  return { ...actions, dispatch };
};
