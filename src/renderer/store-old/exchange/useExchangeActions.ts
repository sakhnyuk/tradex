import { useDispatch } from 'react-redux';

import { OnTradeRes } from 'renderer/api/exchangesApi/types';
import { useMemo } from 'react';
import * as act from './reducer';
import { PairAndExchange, SetOrderTypes, SetSupportedComponents, SetSupportedIntervals, SetWatchlist } from './types';
import { Exchange } from '../../appConstant';

export function useExchangeActions() {
  const dispatch = useDispatch();

  return useMemo(() => ({
    setExchange: (exchange: Exchange) => dispatch(act.setExchange(exchange)),
    setPairAndExchange: (payload: PairAndExchange) => dispatch(act.setPairAndExchange(payload)),
    savePairAndExchange: (payload: PairAndExchange) => dispatch(act.savePairAndExchange(payload)),

    fetchExchangeConfig: () => dispatch(act.fetchExchangeConfig()),
    setOrderTypes: (payload: SetOrderTypes) => dispatch(act.setOrderTypes(payload)),
    setActiveOrderType: (orderType: string) => dispatch(act.setActiveOrderType(orderType)),
    setSupportedComponents:
      (payload: SetSupportedComponents) => dispatch(act.setSupportedComponents(payload)),
    setHistoryComponent:
      (historyComponent: string) => dispatch(act.setHistoryComponent(historyComponent)),
    setSupportedIntervals:
      (payload: SetSupportedIntervals) => dispatch(act.setSupportedIntervals(payload)),

    setPairList: (pairList: { [pair: string]: any }) => dispatch(act.setPairList(pairList)),
    setFilteredPairList:
      (filteredList: { [pair: string]: any }) => dispatch(act.setFilteredPairList(filteredList)),
    setMarketList: (markets: string[]) => dispatch(act.setMarketList(markets)),
    setActiveMarket: (activeMarket: string) => dispatch(act.setActiveMarket(activeMarket)),

    toggleWatchlist: (pairObj: { [key: string]: string }) => dispatch(act.toggleWatchlist(pairObj)),
    setWatchlist: (payload: SetWatchlist) => dispatch(act.setWatchlist(payload)),

    setPrice: (price: number) => dispatch(act.setPrice(price)),
    setIsPriceRising: (isPriceRising: boolean) => dispatch(act.setIsPriceRising(isPriceRising)),
    updateTrades: (trades: OnTradeRes[]) => dispatch(act.updateTrades(trades)),
    setOrderBook: (payload: any) => dispatch(act.setOrderBook(payload)),
    updateOrderbook: (payload: any) => dispatch(act.updateOrderbook(payload)),
    requestPairList: (exchange: Exchange) => dispatch(act.requestPairList(exchange)),
  }), [dispatch]);
}
