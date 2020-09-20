export type Exchange = 'binance';

export const exchanges: Exchange[] = ['binance'];

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
