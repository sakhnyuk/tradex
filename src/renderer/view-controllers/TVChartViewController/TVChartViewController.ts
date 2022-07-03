import { Theme } from '@mui/material';
import { ThemeType } from 'app/theme';
import { ChartController, ExchangeController } from 'core/controllers';
import { action, computed, makeObservable, observable } from 'mobx';
import { IChartingLibraryWidget, SeriesStyle, widget } from 'tv-chart/charting_library.min';
import { Inject, Service } from 'typedi';
import { ExchangeViewController } from '../ExchangeViewController';
import { PairViewController } from '../PairViewController';
import { TVDataFeed } from './TVDataFeed';
import { createChartOptions } from './utils/createChartOptions';

@Service()
export class TVChartViewController {
  tvWidget?: IChartingLibraryWidget;

  @Inject()
  tvDataFeed!: TVDataFeed;

  @Inject()
  private chartController!: ChartController;

  @Inject()
  private exchangeViewController!: ExchangeViewController;

  @Inject()
  private pairViewController!: PairViewController;

  constructor(@Inject() private exchangeController: ExchangeController) {
    this.exchangeController.addExchangeUpdateListener(this.refetchData);
    this.exchangeController.addPairUpdateListener(this.refetchData);
  }

  public applyTheme = (theme: Theme, themeType: ThemeType) => {
    this.tvWidget?.addCustomCSSFile(themeType === ThemeType.DARK ? './night.css' : './day.css');

    this.tvWidget?.applyOverrides({
      'paneProperties.background': theme.palette.background.paper,
      'paneProperties.vertGridProperties.color': theme.palette.divider,
      'paneProperties.horzGridProperties.color': theme.palette.divider,
      'scalesProperties.lineColor': theme.palette.divider,
      'scalesProperties.textColor': theme.palette.text.primary,
    });
  };

  public loadTradingViewWidget = (theme: Theme, themeType: ThemeType) => {
    if (this.tvWidget) {
      return;
    }

    const widgetOptions = createChartOptions({
      interval: this.chartController.getTimeframe(),
      theme,
      exchange: this.exchangeViewController.activeExchange,
      symbol: this.pairViewController.activePair,
      themeType,
      datafeed: this.tvDataFeed,
      autosize: true,
    });

    this.tvWidget = new widget(widgetOptions);

    this.tvWidget.onChartReady(() => {
      this.applyTheme(theme, themeType);

      // this.tvWidget?.subscribe('onAutoSaveNeeded', () => {
      //   this.tvWidget?.save((state) => {
      //     saveState(state, 'CHART_SETTINGS');
      //   });
      // });
    });
  };

  public removeTVWidget = () => {
    this.tvWidget?.remove();
    this.tvWidget = undefined;
  };

  public refetchData = () => {
    const exchange = this.exchangeViewController.activeExchange;
    const symbol = this.pairViewController.activePair;
    const interval = this.chartController.getTimeframe();

    this.tvWidget?.setSymbol(`${exchange}:${symbol}`, interval, () => {});
  };

  public showIndicatorDialog = () => {
    this.tvWidget?.chart().executeActionById('insertIndicator');
  };

  public setCandleType = (type: SeriesStyle) => {
    this.tvWidget?.chart().setChartType(type);
  };
}
