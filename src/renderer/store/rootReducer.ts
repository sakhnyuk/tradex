import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

const reducer = history =>
  combineReducers({
    router: connectRouter(history),
  });

export default reducer;
