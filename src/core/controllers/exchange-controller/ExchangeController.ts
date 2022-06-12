import { ExchangeService } from 'core/services';
import { Inject, Service } from 'typedi';
import signals from 'signals';
import { ExchangeName, ExchangeNameUpdateHandler, SymbolUpdateHandler } from 'core/types';

@Service()
export class ExchangeController {
  private activeExchange: ExchangeName;

  private activePair: TradeSymbol;

  private exchangeChanged: signals.Signal<ExchangeName> = new signals.Signal();

  private pairChanged: signals.Signal<TradeSymbol> = new signals.Signal();

  constructor(private exchangeService: ExchangeService) {
    this.activeExchange = this.exchangeService.exchangeName;
    this.activePair = this.exchangeService.getCurrentSymbol();

    // this.exchangeService.onExchangeUpdate(() => {
    //   this.activeExchange = this.exchangeService.exchangeName;
    // });

    // this.exchangeService.onSymbolUpdate((symbol) => {
    //   this.activePair = symbol;
    // });
  }

  public getActiveExchangeName = (): ExchangeName => {
    return this.activeExchange;
  };

  public getActivePair = (): TradeSymbol => {
    return this.activePair;
  };

  public onExchangeUpdate = (handler: ExchangeNameUpdateHandler): void => {
    this.exchangeChanged.add(handler);
  };

  public onPairUpdate = (handler: SymbolUpdateHandler): void => {
    this.pairChanged.add(handler);
  };

  public setExchange = (exchangeName: ExchangeName): void => {
    this.exchangeService.setActiveExchange(exchangeName);
  };

  public setActivePair = (pair: TradeSymbol): void => {
    this.exchangeService.setActiveSymbol(pair);
  };
}
