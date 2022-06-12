import { Theme } from '@material-ui/core';
import { LayoutsIntervalsKeys } from '../../store-old/chart/types';
import { Intervals } from '../../store-old/exchange/types';

export interface ChartOptions {
  exchange: string;
  symbol: string;
  interval: Intervals;
  containerId: LayoutsIntervalsKeys;
  chartsStorageUrl?: string;
  chartsStorageApiVersion?: '1.0' | '1.1' | undefined;
  clientId?: string;
  userId?: string;
  fullscreen?: boolean;
  autosize?: any;
  theme: Theme;
  defaultCase?: boolean;
  isExplore?: boolean;
}
