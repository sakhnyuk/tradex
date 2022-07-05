import { Inject, Service } from 'typedi';
import { action, computed, makeObservable, observable } from 'mobx';
import type { ChartTimeframe, GroupedTimeframes } from 'lib/core/types';
import { ChartController, ExchangeController } from 'lib/core/controllers';

@Service()
export class TimeframesController {
  @observable currentTimeframe: ChartTimeframe;
  @observable supportedTimeframes: ChartTimeframe[] = [];

  constructor(
    @Inject() private chartController: ChartController,
    @Inject() private exchangeController: ExchangeController,
  ) {
    makeObservable(this);

    this.currentTimeframe = this.chartController.getTimeframe();
    this.supportedTimeframes = this.exchangeController.getSupportedTimeframes();

    this.chartController.addTimeframeUpdateListener(this.updateTimeframeHandler);
    this.exchangeController.addExchangeUpdateListener(this.updateSupportedTimeframes);
    this.exchangeController.addPairUpdateListener(this.updateSupportedTimeframes);
  }

  @action
  private updateTimeframeHandler = (timeframe: ChartTimeframe) => {
    this.currentTimeframe = timeframe;
  };

  @action
  private updateSupportedTimeframes = () => {
    this.supportedTimeframes = this.exchangeController.getSupportedTimeframes();
  };

  public setTimeframe = (timeframe: ChartTimeframe) => {
    this.chartController.setTimeframe(timeframe);
  };

  @computed
  get groupedTimeframes(): GroupedTimeframes {
    const groupedIntervals: GroupedTimeframes = { minutes: [], hours: [], days: [] };

    this.supportedTimeframes.forEach((timeframe: ChartTimeframe) => {
      if (+timeframe < 60) {
        groupedIntervals.minutes.push(timeframe);
      } else if (+timeframe >= 60 && +timeframe < 1440) {
        groupedIntervals.hours.push(timeframe);
      } else {
        groupedIntervals.days.push(timeframe);
      }
    });

    return groupedIntervals;
  }
}
