import React from 'react';
import Container, { Inject, Service } from 'typedi';
import { ExchangesProviderAdapter } from '../../adapters/exchange-provider';
import { LoggerService } from '../../adapters/logger';

import { CoreViewController } from './CoreStore';
import { ExchangeViewController } from './ExchangeViewController';
import { PairViewController } from './PairViewController';

@Service()
export class Store {
  core = new CoreViewController();

  @Inject()
  exchangeViewController!: ExchangeViewController;

  @Inject()
  pairViewController!: PairViewController;
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
