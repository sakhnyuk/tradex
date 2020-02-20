import { Exchange } from '../../appConstant';

export interface InitialExchangeData {
  name: Exchange;
  activePair: string;
}

interface ExchangesList {
  [exchange: string]: InitialExchangeData;
}

export interface ExploreStore {
  activeExchange: Exchange;
  exchanges: ExchangesList;
}

// Actions types
export interface SetExplorePairAndExchange {
  exchange: Exchange;
  pair: string;
}
