import { Service } from 'typedi';
import signals from 'signals';
import { CandleInfoModel } from 'core/models';
import { ExchangeService } from 'core/services';
import type { ExchangeProvider } from 'core/ports';
import { CandleUpdateHandler, ChartTimeframe, TimeframeUpdateHandler } from 'core/types';

@Service()
export class ChartController {
  private timeframe: ChartTimeframe;

  private candleUpdated: signals.Signal<CandleInfoModel> = new signals.Signal();

  private timeframeUpdated: signals.Signal<ChartTimeframe> = new signals.Signal();

  constructor(private exchangeService: ExchangeService) {
    this.timeframe = this.currentExchange.getDefaultTimeframe();

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

  public getCandles = (start: Timestamp, end: Timestamp, count: number): Promise<CandleInfoModel[]> => {
    return this.currentExchange.getCandles(this.exchangeService.getCurrentPair(), this.timeframe, start, end, count);
  };

  public initCandles = () => {
    this.currentExchange.onCandleUpdate(this.exchangeService.getCurrentPair(), this.timeframe, this.emitCandleUpdate);
  };

  public addCandleUpdateListener = (handler: CandleUpdateHandler) => {
    this.candleUpdated.add(handler);
  };

  public setTimeframe = (timeframe: ChartTimeframe) => {
    this.timeframe = timeframe;
    this.timeframeUpdated.dispatch(timeframe);
  };

  public getTimeframe = (): ChartTimeframe => {
    return this.timeframe;
  };

  public addTimeframeUpdateListener = (handler: TimeframeUpdateHandler) => {
    this.timeframeUpdated.add(handler);
  };

  public removeTimeframeUpdateListener = (handler: TimeframeUpdateHandler) => {
    this.timeframeUpdated.remove(handler);
  };

  public closeUpdateCandle = (): void => {
    this.currentExchange.closeCandle();
    this.candleUpdated.removeAll();
  };
}
