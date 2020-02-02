export const exchanges = [
  'binance',
  'bitfinex',
  'bitmex',
  'bitmex-testnet',
  'cryptobridge',
  'hitbtc',
  'okex',
  'poloniex',
  'crex24',
  'huobi-global',
  'exmo',
];

export type Exchange =
  | 'binance'
  | 'bitfinex'
  | 'bitmex'
  | 'bitmex-testnet'
  | 'cryptobridge'
  | 'hitbtc'
  | 'okex'
  | 'poloniex'
  | 'crex24'
  | 'huobi-global'
  | 'exmo';

export const privateExchanges: Exchange[] = [
  'binance',
  'bitfinex',
  'cryptobridge',
  'crex24',
  'okex',
  'hitbtc',
  'huobi-global',
];
export const marginExchanges = ['bitmex', 'bitmex-testnet'];
export const arbitrageExchanges = ['binance', 'bitfinex', 'exmo'];

export const exchangePairs: { [key: string]: string } = {
  binance: 'BTC/USDT',
  bitfinex: 'BTC/USD',
  bitmex: 'XBT/USD',
  'bitmex-testnet': 'XBT/USD',
  cryptobridge: 'ETH/BTC',
  hitbtc: 'BTC/USD',
  okex: 'BTC/USDT',
  poloniex: 'BTC/USDT',
  crex24: 'BTC/USD',
  'huobi-global': 'BTC/USDT',
  exmo: 'BTC/USD',
};

export const storeVersion = 20022020;

export const isMac = process.platform === 'darwin';

export const appName = 'Tradev App';

export const appRouting = {
  path: {
    ANALYSIS: '/',
    SETTINGS: '/settings',
  },
  labels: {
    ANALYSIS: 'Analysis',
    SETTINGS: 'Settings',
  },
};
