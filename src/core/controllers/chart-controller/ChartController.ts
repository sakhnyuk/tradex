import { Service } from 'typedi';
import signals from 'signals';
import { CandleInfoModel } from 'core/models';
import { ExchangeService } from 'core/services';
import type { ExchangeProvider } from 'core/ports';
import { CandleUpdateHandler, Intervals } from 'core/types';

@Service()
export class ChartController {
  private timeframe: Intervals;

  private candleUpdated: signals.Signal<CandleInfoModel> = new signals.Signal();

  constructor(private exchangeService: ExchangeService) {
    this.timeframe = '60';

    this.exchangeService.onExchangeUpdate(async (exchange) => {
      exchange.onCandleUpdate(this.exchangeService.getCurrentPair(), this.timeframe, this.emitCandleUpdate);
    });

    this.exchangeService.onPairUpdate(async (pair) => {
      this.currentExchange.closeCandle();
      this.currentExchange.onCandleUpdate(pair, this.timeframe, this.emitCandleUpdate);
    });
  }

  private get currentExchange(): ExchangeProvider {
    return this.exchangeService.getCurrentExchangeRepository();
  }

  private emitCandleUpdate = (candle: CandleInfoModel): void => {
    this.candleUpdated.dispatch(candle);
  };

  public getCandles = (start: Timestamp, end: Timestamp): Promise<CandleInfoModel[]> => {
    return this.currentExchange.getCandles(this.exchangeService.getCurrentPair(), this.timeframe, start, end);
  };

  public initCandles = () => {
    this.currentExchange.onCandleUpdate(this.exchangeService.getCurrentPair(), this.timeframe, this.emitCandleUpdate);
  };

  public addCandleUpdateListener = (handler: CandleUpdateHandler) => {
    this.candleUpdated.add(handler);
  };

  public setTimeframe = (timeframe: Intervals) => {
    this.timeframe = timeframe;
  };

  public getTimeframe = (): Intervals => {
    return this.timeframe;
  };

  public closeUpdateCandle = (): void => {
    this.currentExchange.closeCandle();
    this.candleUpdated.removeAll();
  };
}
