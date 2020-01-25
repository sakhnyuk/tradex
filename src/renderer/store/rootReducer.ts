import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

const reducer = (history: any) =>
  combineReducers({
    router: connectRouter(history),
  });

export default reducer;
