import { Theme } from '@mui/material';
import { ThemeType } from 'app/theme';
import { ChartingLibraryWidgetOptions, IBasicDataFeed } from 'tv-chart/charting_library.min';
import { getTimezone } from 'app/utils/chartUtils';
import { Intervals } from 'core/types';

export interface ChartParams {
  exchange: string;
  symbol: string;
  interval: Intervals;
  chartsStorageUrl?: string;
  chartsStorageApiVersion?: '1.0' | '1.1' | undefined;
  clientId?: string;
  userId?: string;
  fullscreen?: boolean;
  autosize?: any;
  theme: Theme;
  defaultCase?: boolean;
  isExplore?: boolean;
  themeType: ThemeType;
  datafeed: IBasicDataFeed;
}

export const createChartOptions = (params: ChartParams) => {
  const {
    exchange,
    symbol,
    interval,
    chartsStorageUrl,
    chartsStorageApiVersion,
    clientId,
    userId,
    fullscreen,
    autosize,
    theme,
    defaultCase,
    themeType,
    datafeed,
  } = params;

  const widgetOptions: ChartingLibraryWidgetOptions = {
    // debug: true, // DEBUG CHART
    timezone: getTimezone(),
    symbol: `${exchange}:${symbol}`,
    datafeed,
    interval,
    container_id: 'tv_chart_container',
    library_path: '../charting_library/',
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
    custom_css_url: themeType === ThemeType.DARK ? './night.css' : './day.css',
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
