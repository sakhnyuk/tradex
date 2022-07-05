import { ExchangeService } from 'lib/core/services';
import { Inject, Service } from 'typedi';
import signals from 'signals';
import { ExchangeName, ExchangeNameUpdateHandler, PairUpdateHandler } from 'lib/core/types';

@Service()
export class ExchangeController {
  private exchangeChanged: signals.Signal<ExchangeName> = new signals.Signal();

  private pairChanged: signals.Signal<TradeSymbol> = new signals.Signal();

  constructor(@Inject() private exchangeService: ExchangeService) {
    this.exchangeService.onExchangeUpdate((exchange) => {
      this.exchangeChanged.dispatch(exchange.getName());
    });

    this.exchangeService.onPairUpdate((pair) => {
      this.pairChanged.dispatch(pair);
    });
  }

  public getActiveExchangeName = (): ExchangeName => {
    return this.exchangeService.getCurrentExchangeRepository().getName();
  };

  public getSupportedTimeframes = () => {
    return this.exchangeService.getCurrentExchangeRepository().getSupportedTimeframes();
  };

  public getActivePair = (): TradeSymbol => {
    return this.exchangeService.getCurrentPair();
  };

  public addExchangeUpdateListener = (handler: ExchangeNameUpdateHandler): void => {
    this.exchangeChanged.add(handler);
  };

  public addPairUpdateListener = (handler: PairUpdateHandler): void => {
    this.pairChanged.add(handler);
  };

  public getExchangeName = () => {
    return this.exchangeService.getCurrentExchangeRepository().getName();
  };

  public setExchange = (exchangeName: ExchangeName): void => {
    this.exchangeService.setActiveExchange(exchangeName);
  };

  public setActivePair = (pair: TradeSymbol): void => {
    this.exchangeService.setActivePair(pair);
  };
}
