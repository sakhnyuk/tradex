import { createAction, createReducer } from 'redux-act';
import set from 'lodash/fp/set';

import { ChartStore, Layouts, SetChartInterval } from './types';

const initialState: ChartStore = {
  layout: 'one',
  one: {
    default: '60', // component uses interval from tradingCore(acc) instead of this field in default variant
  },
  topbot: {
    top: '15',
    bot: '60',
  },
  leftright: {
    left: '15',
    right: '60',
  },
  topbotleftright: {
    topleft: '1',
    topright: '15',
    botleft: '60',
    botright: '1D',
  },
};

export const setLayout = createAction<Layouts>('core/setLayout');
export const setChartInterval = createAction<SetChartInterval>('core/setLayoutInterval');

const chartReducer = createReducer<ChartStore>({}, initialState)
  .on(setLayout, (state, layout) => set('layout', layout, state))
  .on(setChartInterval, (state, { layout, id, interval }) => {
    if (layout === 'leftright' || layout === 'topbot') {
      if (id === 'left' || id === 'top') {
        const leftright = set(['leftright', 'left'], interval, state);
        return set(['topbot', 'top'], interval, leftright);
      }

      if (id === 'right' || id === 'bot') {
        const leftright = set(['leftright', 'right'], interval, state);
        return set(['topbot', 'bot'], interval, leftright);
      }
    }

    return set([layout, id], interval, state);
  });

export default chartReducer;
