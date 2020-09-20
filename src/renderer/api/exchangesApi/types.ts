export interface OnDepthUpdateRes {
  asks: [number, number][];
  bids: [number, number][];
  type: 'snapshot' | 'update';
  exchange: string;
  symbol: string;
}

export interface OnTradeRes {
  id: number;
  side: 'sell' | 'buy';
  timestamp: number;
  price: number;
  amount: number;
  symbol: string;
  exchange: string;
}

export interface OnKlineRes {
  close: number;
  high: number;
  low: number;
  open: number;
  time: number;
  volume: number;
}

export interface PairData {
  symbol: string;
  volume: number;
  priceChangePercent: number;
  price: number;
  high: number;
  low: number;
  quote: string;
  base: string;
  maxLeverage: number;
  tickSize: number;
}

export interface PairsMapped {
  BTC: PairData[];
  ALT: PairData[];
  STABLE: PairData[];
}

export interface KlineResItem {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}
