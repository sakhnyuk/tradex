import { Theme } from '@mui/material';
import { ThemeType } from 'app/theme';

export interface ChartOptions {
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
}

export type Intervals = '1' | '3' | '5' | '15' | '30' | '60' | '120' | '240' | '1D' | '1W' | '1M';
export type SupportedIntervals = Array<Intervals>;
