import { useDispatch, useSelector } from 'react-redux';

import { selectCoreStore } from './selectors';
import * as act from './reducer';
import { TypeTheme } from '../../theme/interface';

export const useCoreStore = () => {
  const dispatch = useDispatch();
  const coreStore = useSelector(selectCoreStore);

  const actions = {
    setOnline: (isOnline: boolean) => dispatch(act.setToCore({ isOnline })),
    setReloadChart: (reloadChart: boolean) => dispatch(act.setToCore({ reloadChart })),
    setTheme: (theme: TypeTheme) => dispatch(act.setToCore({ theme })),
    setOpenSetting: (settingOpen: boolean) => dispatch(act.setToCore({ settingOpen })),
    setOpenPairsBar: (pairsBarOpen: boolean) => dispatch(act.setToCore({ pairsBarOpen })),
    setPageSetting: (settingPage: string) => dispatch(act.setToCore({ settingPage })),
    setIcons: (icons: { [key: string]: string }) => dispatch(act.setToCore({ icons })),
    setShowAllAccounts: (showAllAccounts: boolean) => dispatch(act.setToCore({ showAllAccounts })),
    setShowAllPositions: (showAllPositions: boolean) => dispatch(act.setToCore({ showAllPositions })),
    setShowAllPairs: (showAllPairs: boolean) => dispatch(act.setToCore({ showAllPairs })),
    setOrderBookIsLoading: (orderBookIsLoading: boolean) => dispatch(act.setToCore({ orderBookIsLoading })),
    setTradesIsLoading: (tradesIsLoading: boolean) => dispatch(act.setToCore({ tradesIsLoading })),
    setPairListSorting: (pairListSorting: string) => dispatch(act.setToCore({ pairListSorting })),
  };

  return { ...coreStore, ...actions, dispatch };
};
