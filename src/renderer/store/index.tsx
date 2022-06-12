import React from 'react';
import Container, { Inject, Service } from 'typedi';
import { ExchangesProviderAdapter } from '../../adapters/exchange-provider';
import { LoggerService } from '../../adapters/logger';

import { CoreStore } from './CoreStore';
import { ExchangeStore } from './ExchangeStore';

@Service()
export class Store {
  core = new CoreStore();

  @Inject()
  exchange!: ExchangeStore;
}

Container.set('Logger', new LoggerService());
Container.set('ExchangesDataProvider', new ExchangesProviderAdapter());
export const store = Container.get(Store);
const StoresContext = React.createContext<Store>(store);

type Props = {
  children?: React.ReactNode;
};

export const StoresProvider: React.FC<Props> = ({ children }: Props) => {
  return <StoresContext.Provider value={store}>{children}</StoresContext.Provider>;
};

export const useStores = () => React.useContext(StoresContext);
