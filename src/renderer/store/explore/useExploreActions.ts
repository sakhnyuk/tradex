import { useDispatch } from 'react-redux';
import { useCallback } from 'react';

import { setExplorePairAndExchange } from './reducer';
import { SetExplorePairAndExchange } from './types';

export function useExploreActions() {
  const dispatch = useDispatch();

  const actions = {
    setExplorePairAndExchange: useCallback(
      (payload: SetExplorePairAndExchange) => dispatch(setExplorePairAndExchange(payload)),
      [dispatch],
    ),
  };

  return { ...actions, dispatch };
}
