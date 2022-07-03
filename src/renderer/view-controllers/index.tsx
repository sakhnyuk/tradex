import React from 'react';
import Container, { Inject, Service } from 'typedi';
import { ExchangesProviderAdapter } from '../../adapters/exchange-provider';
import { LoggerService } from '../../adapters/logger';

import { CoreViewController } from './CoreStore';
import { ExchangeViewController } from './ExchangeViewController';
import { PairViewController } from './PairViewController';
import { TimeframesController } from './TimeframesController';
import { TradesViewController } from './TradesViewController';
import { TVChartViewController } from './TVChartViewController';

@Service()
export class Store {
  core = new CoreViewController();

  @Inject()
  exchangeViewController!: ExchangeViewController;

  @Inject()
  pairViewController!: PairViewController;

  @Inject()
  tradesViewController!: TradesViewController;

  @Inject()
  tvChartViewController!: TVChartViewController;

  @Inject()
  timeframeController!: TimeframesController;
}

Container.set('Logger', new LoggerService());
Container.set('ExchangesDataProvider', new ExchangesProviderAdapter());
export const store = Container.get(Store);
const StoresContext = React.createContext<Store>(store);

type Props = {
  children?: React.ReactNode;
};

export const ViewControllerProvider: React.FC<Props> = ({ children }: Props) => {
  return <StoresContext.Provider value={store}>{children}</StoresContext.Provider>;
};

export const useViewControllers = () => React.useContext(StoresContext);
