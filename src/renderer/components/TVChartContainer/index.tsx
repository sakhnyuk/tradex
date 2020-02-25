/* eslint-disable new-cap */
/* eslint-disable @typescript-eslint/camelcase */
import React, { useEffect, useCallback } from 'react';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';

import Datafeed from './datafeed';
import { saveState, loadState } from '../../utils/localStorage';
import { selectCore } from '../../store/core/selectors';
import * as exchangeSelector from '../../store/exchange/selectors';

import { getTimezone, getLanguageFromURL } from '../../utils/chartUtils';
import ChartHeader from './ChartHeader';
import { Intervals } from '../../store/exchange/types';
import styles from './styles';

import {
  widget,
  IChartingLibraryWidget,
  SeriesStyle,
  ChartingLibraryWidgetOptions,
  LanguageCode,
} from '../../../charting_library/charting_library.min';
import { LayoutsIntervalsKeys } from '../../store/chart/types';

declare global {
  interface Window {
    tvWidget: IChartingLibraryWidget | undefined;
  }
}

const useStyles = makeStyles(styles);

const getOptions = options => {
  const {
    exchange,
    symbol,
    interval,
    containerId,
    chartsStorageUrl,
    chartsStorageApiVersion,
    clientId,
    userId,
    fullscreen,
    autosize,
    theme,
    defaultCase,
  } = options;

  const widgetOptions: ChartingLibraryWidgetOptions = {
    timezone: getTimezone(),
    symbol: `${exchange}:${symbol}`,
    datafeed: Datafeed,
    interval,
    container_id: containerId,
    library_path: './charting_library/',
    locale: 'en',
    charts_storage_url: chartsStorageUrl,
    charts_storage_api_version: chartsStorageApiVersion,
    client_id: clientId,
    user_id: userId || 'public_user_id',
    fullscreen,
    autosize,
    studies_overrides: {
      'volume.volume.color.0': 'rgba(233, 90, 90, 0.2)',
      'volume.volume.color.1': 'rgba(101, 204, 98, 0.2)',
    },
    overrides: {
      'mainSeriesProperties.showCountdown': true,
      'paneProperties.background': theme.palette.background.paper,
      'paneProperties.vertGridProperties.color': theme.palette.divider,
      'paneProperties.horzGridProperties.color': theme.palette.divider,
      'symbolWatermarkProperties.transparency': 80,
      'scalesProperties.lineColor': theme.palette.divider,
      'scalesProperties.textColor': theme.palette.text.primary,
      'mainSeriesProperties.candleStyle.wickUpColor': 'rgb(102, 204, 98)',
      'mainSeriesProperties.candleStyle.wickDownColor': 'rgb(233, 90, 90)',
      'mainSeriesProperties.candleStyle.upColor': 'rgb(102, 204, 98)',
      'mainSeriesProperties.candleStyle.downColor': 'rgb(233, 90, 90)',
    },
    loading_screen: {
      backgroundColor: theme.palette.background.paper,
      foregroundColor: theme.palette.text.primary,
    },
    disabled_features: [
      'header_compare',
      'header_undo_redo',
      'header_screenshot',
      'header_saveload',
      'header_symbol_search',
      'use_localstorage_for_settings',
      'header_settings',
      'symbol_search_hot_key',
      'symbol_info',
      'context_menus',
      'header_widget',
      'go_to_date',
    ],
    enabled_features: ['same_data_requery'],
    custom_css_url: theme.palette.type === 'dark' ? './night.css' : './day.css',
  };

  if (!defaultCase) {
    if (typeof widgetOptions.enabled_features !== 'undefined') {
      widgetOptions.enabled_features.push('hide_left_toolbar_by_default');
    }

    if (typeof widgetOptions.disabled_features !== 'undefined') {
      widgetOptions.disabled_features.push('control_bar');
    }
  }

  return widgetOptions;
};

interface Props {
  containerId: LayoutsIntervalsKeys;
  interval: Intervals;
  defaultCase?: boolean;
  isAnalysis: boolean;
}

const TVChartContainer = (props: Props) => {
  const classes = useStyles();
  const { interval, containerId, isAnalysis } = props;
  const exchange = useSelector(exchangeSelector.selectExchange);
  const symbol = useSelector(exchangeSelector.selectActivePair);
  const appTheme = useSelector(selectCore.theme);
  const isOnline = useSelector(selectCore.isOnline);

  const theme = useTheme();

  const refetchData = useCallback(() => {
    if (!window.tvWidget) return;

    window.tvWidget.setSymbol(`${exchange}:${symbol}`, interval, () => {});
    window.tvWidget.save(state => {
      saveState(state, 'CHART_SETTINGS');
    });
  }, [exchange, interval, symbol]);

  const showIndicatorsDialog = useCallback(() => {
    if (!window.tvWidget) return;
    window.tvWidget.chart().executeActionById('insertIndicator');
  }, []);

  const setCandleType = useCallback((type: SeriesStyle) => {
    if (!window.tvWidget) return;
    window.tvWidget.chart().setChartType(type);
  }, []);

  const applyTheme = useCallback(() => {
    if (!window.tvWidget) return;
    window.tvWidget.addCustomCSSFile(appTheme === 'dark' ? './night.css' : './day.css');

    window.tvWidget.applyOverrides({
      'paneProperties.background': theme.palette.background.paper,
      'paneProperties.vertGridProperties.color': theme.palette.divider,
      'paneProperties.horzGridProperties.color': theme.palette.divider,
      'scalesProperties.lineColor': theme.palette.divider,
      'scalesProperties.textColor': theme.palette.text.primary,
    });

    window.tvWidget.save(state => {
      saveState(state, 'CHART_SETTINGS');
    });
  }, [appTheme, theme.palette.background.paper, theme.palette.divider, theme.palette.text.primary]);

  const loadTradingView = useCallback(() => {
    const widgetOptions = getOptions({ ...props, theme, exchange, symbol });
    const tvWidget = new widget(widgetOptions);

    tvWidget.onChartReady(() => {
      window.tvWidget = tvWidget;

      const cacheSettings = loadState('CHART_SETTINGS');

      if (cacheSettings) {
        // replace pair from chart cache with redux cache, force consistency
        cacheSettings.charts[0].panes[0].sources[0].state.symbol = `${exchange}:${symbol}`;
        cacheSettings.charts[0].panes[0].sources[0].state.shortName = `${exchange}:${symbol}`;
        cacheSettings.charts[0].panes[0].sources[0].state.interval = interval;

        tvWidget.load(cacheSettings); // FIXME: warnings on load settings TODO:
        applyTheme();
      }

      tvWidget.subscribe('onAutoSaveNeeded', () => {
        tvWidget.save(state => {
          saveState(state, 'CHART_SETTINGS');
        });
      });
    });
  }, [applyTheme, exchange, interval, props, symbol, theme]);

  useEffect(() => {
    try {
      loadTradingView();

      return () => {
        if (typeof window.tvWidget !== 'undefined') {
          window.tvWidget.remove();
          window.tvWidget = undefined;
        }
      };
    } catch (err) {
      console.error('Error loadTradingView() - ', err.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    refetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exchange, symbol, interval, isOnline]);

  useEffect(() => {
    applyTheme();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appTheme]);

  return (
    <>
      <ChartHeader
        setCandleType={setCandleType}
        activeInterval={interval}
        showIndicatorsDialog={showIndicatorsDialog}
        containerId={containerId}
        isAnalysis={isAnalysis}
      />
      <div id={containerId} className={classes.root} />
    </>
  );
};

TVChartContainer.defaultProps = {
  symbol: 'Binance:BTC/USDT',
  interval: '60',
  containerId: 'tv_chart_container',
  libraryPath: '/charting_library/',
  chartsStorageUrl: 'https://saveload.tradingview.com',
  chartsStorageApiVersion: '1.1',
  clientId: 'tradingview.com',
  userId: 'public_user_id',
  fullscreen: false,
  autosize: true,
  studiesOverrides: {},
  position: {},
};

export default TVChartContainer;
