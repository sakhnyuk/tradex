import exchanges from './exchanges';

type Exchanges = typeof exchanges;
type SupportedExchanges = keyof Exchanges;

export class ExchangeProvider {
  supportedExchanges = Object.keys(exchanges) as SupportedExchanges[];

  api: any;

  constructor() {
    this.supportedExchanges.forEach((exch) => {
      this.api[exch] = new exchanges[exch]();
    });
  }
}
