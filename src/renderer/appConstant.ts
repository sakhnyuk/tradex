export type Exchange =
  | 'binance'
  | 'bitfinex'
  | 'bitmex'
  | 'bitmex-testnet'
  | 'hitbtc'
  | 'okex'
  | 'poloniex'
  | 'crex24'
  | 'huobi-global'
  | 'exmo';

export const exchanges: Exchange[] = [
  'binance',
  'bitfinex',
  'bitmex',
  'bitmex-testnet',
  'hitbtc',
  'okex',
  'poloniex',
  'crex24',
  'huobi-global',
  'exmo',
];

export const privateExchanges: Exchange[] = ['binance', 'bitfinex', 'crex24', 'okex', 'hitbtc', 'huobi-global'];
export const marginExchanges = ['bitmex', 'bitmex-testnet'];
export const arbitrageExchanges = ['binance', 'bitfinex', 'exmo'];

export const exchangePairs: { [key: string]: string } = {
  binance: 'BTC/USDT',
  bitfinex: 'BTC/USD',
  bitmex: 'XBT/USD',
  'bitmex-testnet': 'XBT/USD',
  hitbtc: 'BTC/USD',
  okex: 'BTC/USDT',
  poloniex: 'BTC/USDT',
  crex24: 'BTC/USD',
  'huobi-global': 'BTC/USDT',
  exmo: 'BTC/USD',
};

export const storeVersion = 20022020;

export const isMac = process.platform === 'darwin';

export const appName = 'Tradex App';

export const appRouting = {
  path: {
    EXPLORE: '/',
    SETTINGS: '/settings',
  },
  labels: {
    EXPLORE: 'Explore',
    SETTINGS: 'Settings',
  },
};
