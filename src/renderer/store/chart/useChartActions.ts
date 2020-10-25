import { useDispatch } from 'react-redux';
import { useMemo } from 'react';

import * as act from './reducer';
import { Layouts, SetChartInterval } from './types';

export const useChartActions = () => {
  const dispatch = useDispatch();
  
  return useMemo(() => ({
    setLayout: (layout: Layouts) => dispatch(act.setLayout(layout)),
    setChartInterval: (payload: SetChartInterval) => dispatch(act.setChartInterval(payload)),
  }), [dispatch]);
};
