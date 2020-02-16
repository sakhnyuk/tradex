import { Store } from '../types';
import { LayoutIntervals } from './types';

export const selectLayout = (state: Store) => state.chart.layout;

export const chartSelector = {
  interval: (state: Store) => state.chart.one.default,
  layout: (state: Store) => state.chart.layout,
  layoutIntervals: (state: Store): LayoutIntervals => state.chart[selectLayout(state)],
};
