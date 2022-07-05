import { Theme } from '@mui/material';
import { ThemeType } from 'theme';
import { ChartController, ExchangeController } from 'lib/core/controllers';
import type { Logger } from 'lib/core/ports';
import * as TradingView from 'lib/charting_library/charting_library';
import { Inject, Service } from 'typedi';
import { CoreViewController } from '../CoreStore';
import { ExchangeViewController } from '../ExchangeViewController';
import { PairViewController } from '../PairViewController';
import { TVDataFeed } from './TVDataFeed';
import { createChartOptions } from './utils/createChartOptions';

const DOM_CONTAINER_ID = 'tv_chart_container';

@Service()
export class TVChartViewController {
  tvWidget?: TradingView.IChartingLibraryWidget;

  @Inject('Logger')
  logger!: Logger;

  @Inject()
  tvDataFeed!: TVDataFeed;

  @Inject()
  private exchangeViewController!: ExchangeViewController;

  @Inject()
  private pairViewController!: PairViewController;

  public CONTAINER_ID = DOM_CONTAINER_ID;

  constructor(
    @Inject() private exchangeController: ExchangeController,
    @Inject() private chartController: ChartController,
    @Inject() private coreViewController: CoreViewController,
  ) {
    this.exchangeController.addExchangeUpdateListener(this.refetchData);
    this.exchangeController.addPairUpdateListener(this.refetchData);
    this.coreViewController.addOnlineStatusUpdateListener((isOnline) => {
      if (isOnline) {
        this.refetchData();
      }
    });
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

  public loadChart = (theme: Theme, themeType: ThemeType) => {
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
      containerId: this.CONTAINER_ID,
    });

    this.tvWidget = new TradingView.widget(widgetOptions);

    this.tvWidget.onChartReady(() => {
      this.applyTheme(theme, themeType);

      const chartSettingsString = localStorage.getItem('CHART_SETTINGS');
      const chartSettings = chartSettingsString ? JSON.parse(chartSettingsString) : null;

      if (chartSettings) {
        this.tvWidget?.load(chartSettings);
        this.applyTheme(theme, themeType);
      }

      this.tvWidget?.subscribe('onAutoSaveNeeded', () => {
        this.tvWidget?.save((state) => {
          localStorage.setItem('CHART_SETTINGS', JSON.stringify(state));
        });
      });

      this.tvWidget?.subscribe('chart_load_requested', (event) => {
        console.log('chart_load_requested', event);
      });
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

    this.logger.info('refetchData', { exchange, symbol, interval });

    this.tvWidget?.setSymbol(`${exchange}:${symbol}`, interval as TradingView.ResolutionString, () => {});
  };

  public showIndicatorDialog = () => {
    this.tvWidget?.chart().executeActionById('insertIndicator');
  };

  public setCandleType = (type: TradingView.SeriesStyle) => {
    this.tvWidget?.chart().setChartType(type);
  };
}
