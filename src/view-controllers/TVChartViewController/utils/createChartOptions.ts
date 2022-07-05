import { Theme } from '@mui/material';
import { ThemeType } from 'theme';
import { ChartingLibraryWidgetOptions, IBasicDataFeed, ResolutionString } from 'lib/charting_library/charting_library';
import { getTimezone } from 'utils/chartUtils';
import { ChartTimeframe } from 'lib/core/types';

export interface ChartParams {
  exchange: string;
  symbol: string;
  interval: ChartTimeframe;
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
  containerId: string;
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
    containerId,
  } = params;

  const widgetOptions: ChartingLibraryWidgetOptions = {
    // debug: true, // DEBUG CHART
    timezone: getTimezone(),
    symbol: `${exchange}:${symbol}`,
    datafeed,
    interval: interval as ResolutionString,
    container: containerId,
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
      'border_around_the_chart',
      'header_compare',
      'header_undo_redo',
      'header_screenshot',
      'header_saveload',
      'header_symbol_search',
      'header_fullscreen_button',
      'header_settings',
      'symbol_search_hot_key',
      'symbol_info',
      'context_menus',
      'go_to_date',
      'control_bar',
    ],
    enabled_features: ['same_data_requery'],
    custom_css_url: themeType === ThemeType.DARK ? './night.css' : './day.css',
  };

  return widgetOptions;
};
