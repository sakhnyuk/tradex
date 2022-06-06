import { ExchangeEntity } from 'core/ports';

export enum ExchangeConnectionStatus {
  CONNECTED = 'connected',
  DISCONNECTED = 'disconnected',
}

export type ExchangeUpdateHandler = (exchange: ExchangeEntity) => void;
export type SymbolUpdateHandler = (symbol: TradeSymbol) => void;
