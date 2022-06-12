import React from 'react';
import { CoreStore } from './CoreStore';

export class Store {
  core = new CoreStore();
}

export const store = new Store();
const StoresContext = React.createContext<Store>(store);

type Props = {
  children?: React.ReactNode;
};

export const StoresProvider: React.FC<Props> = ({ children }: Props) => {
  return <StoresContext.Provider value={store}>{children}</StoresContext.Provider>;
};

export const useStores = () => React.useContext(StoresContext);
