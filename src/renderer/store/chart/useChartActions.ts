import { useDispatch } from 'react-redux';
import { useCallback } from 'react';

import * as act from './reducer';
import { Layouts, SetChartInterval } from './types';

export const useChartActions = () => {
  const dispatch = useDispatch();

  const actions = {
    setLayout: useCallback((layout: Layouts) => dispatch(act.setLayout(layout)), [dispatch]),
    setChartInterval: useCallback((payload: SetChartInterval) => dispatch(act.setChartInterval(payload)), [dispatch]),
  };

  return { ...actions, dispatch };
};
