import { Intervals } from 'app/components/TVChartContainer/types';

export type Layouts = 'one' | 'leftright' | 'topbot' | 'topbotleftright';

export type LayoutsIntervalsKeys =
  | 'default'
  | 'top'
  | 'bot'
  | 'left'
  | 'right'
  | 'topleft'
  | 'topright'
  | 'botleft'
  | 'botright';

export interface SetChartInterval {
  layout: Layouts;
  id: LayoutsIntervalsKeys;
  interval: Intervals;
}

export interface ChartStore {
  layout: Layouts;
  one: {
    default: Intervals;
  };
  topbot: {
    top: Intervals;
    bot: Intervals;
  };
  leftright: {
    left: Intervals;
    right: Intervals;
  };
  topbotleftright: {
    topleft: Intervals;
    topright: Intervals;
    botleft: Intervals;
    botright: Intervals;
  };
}

export type LayoutIntervals = { [key in LayoutsIntervalsKeys]?: Intervals };
