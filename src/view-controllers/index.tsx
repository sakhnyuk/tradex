import React from 'react';
import Container, { Inject, Service } from 'typedi';
import { ExchangesProviderAdapter } from 'lib/adapters/exchange-provider';
import { LoggerService } from 'lib/adapters/logger';
import { CoreViewController } from './CoreStore';
import { ExchangeViewController } from './ExchangeViewController';
import { PairViewController } from './PairViewController';
import { TimeframesController } from './TimeframesController';
import { TradesViewController } from './TradesViewController';
import { TVChartViewController } from './TVChartViewController';

@Service()
export class Controllers {
  @Inject()
  core!: CoreViewController;

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
export const controllers = Container.get(Controllers);
const ControllersContext = React.createContext<Controllers>(controllers);

type Props = {
  children?: React.ReactNode;
};

export const ViewControllerProvider: React.FC<Props> = ({ children }: Props) => {
  return <ControllersContext.Provider value={controllers}>{children}</ControllersContext.Provider>;
};

export const useViewControllers = () => React.useContext(ControllersContext);
