import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { OnTradeRes } from 'renderer/api/exchangesApi/types';
import * as act from './reducer';
import { PairAndExchange, SetOrderTypes, SetSupportedComponents, SetSupportedIntervals, SetWatchlist } from './types';
import { Exchange } from '../../appConstant';

export function useExchangeActions() {
  const dispatch = useDispatch();

  const actions = {
    setExchange: useCallback((exchange: Exchange) => dispatch(act.setExchange(exchange)), [dispatch]),
    setPairAndExchange: useCallback((payload: PairAndExchange) => dispatch(act.setPairAndExchange(payload)), [
      dispatch,
    ]),
    savePairAndExchange: useCallback((payload: PairAndExchange) => dispatch(act.savePairAndExchange(payload)), [
      dispatch,
    ]),

    fetchExchangeConfig: useCallback(() => dispatch(act.fetchExchangeConfig()), [dispatch]),
    setOrderTypes: useCallback((payload: SetOrderTypes) => dispatch(act.setOrderTypes(payload)), [dispatch]),
    setActiveOrderType: useCallback((orderType: string) => dispatch(act.setActiveOrderType(orderType)), [dispatch]),
    setSupportedComponents: useCallback(
      (payload: SetSupportedComponents) => dispatch(act.setSupportedComponents(payload)),
      [dispatch],
    ),
    setHistoryComponent: useCallback(
      (historyComponent: string) => dispatch(act.setHistoryComponent(historyComponent)),
      [dispatch],
    ),
    setSupportedIntervals: useCallback(
      (payload: SetSupportedIntervals) => dispatch(act.setSupportedIntervals(payload)),
      [dispatch],
    ),

    setPairList: useCallback((pairList: { [pair: string]: any }) => dispatch(act.setPairList(pairList)), [dispatch]),
    setFilteredPairList: useCallback(
      (filteredList: { [pair: string]: any }) => dispatch(act.setFilteredPairList(filteredList)),
      [dispatch],
    ),
    setMarketList: useCallback((markets: string[]) => dispatch(act.setMarketList(markets)), [dispatch]),
    setActiveMarket: useCallback((activeMarket: string) => dispatch(act.setActiveMarket(activeMarket)), [dispatch]),

    toggleWatchlist: useCallback((pairObj: { [key: string]: string }) => dispatch(act.toggleWatchlist(pairObj)), [
      dispatch,
    ]),
    setWatchlist: useCallback((payload: SetWatchlist) => dispatch(act.setWatchlist(payload)), [dispatch]),

    setPrice: useCallback((price: number) => dispatch(act.setPrice(price)), [dispatch]),
    setIsPriceRising: useCallback((isPriceRising: boolean) => dispatch(act.setIsPriceRising(isPriceRising)), [
      dispatch,
    ]),
    updateTrades: useCallback((trades: OnTradeRes[]) => dispatch(act.updateTrades(trades)), [dispatch]),
    setOrderBook: useCallback((payload: any) => dispatch(act.setOrderBook(payload)), [dispatch]),
    updateOrderbook: useCallback((payload: any) => dispatch(act.updateOrderbook(payload)), [dispatch]),
    requestPairList: useCallback((exchange: Exchange) => dispatch(act.requestPairList(exchange)), [dispatch]),
  };

  return { ...actions, dispatch };
}
