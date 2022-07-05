export type ChartTimeframe =
  | '1'
  | '3'
  | '5'
  | '15'
  | '30'
  | '60'
  | '120'
  | '240'
  | '360'
  | '480'
  | '720'
  | '1D'
  | '1W'
  | '1M';

export interface GroupedTimeframes {
  minutes: ChartTimeframe[];
  hours: ChartTimeframe[];
  days: ChartTimeframe[];
}
