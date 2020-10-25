import { useDispatch } from 'react-redux';
import { useMemo } from 'react';

import { setExplorePairAndExchange } from './reducer';
import { SetExplorePairAndExchange } from './types';

export function useExploreActions() {
  const dispatch = useDispatch();

  return useMemo(() => ({
    setExplorePairAndExchange:
      (payload: SetExplorePairAndExchange) => dispatch(setExplorePairAndExchange(payload)),
  }), [dispatch]);
}
