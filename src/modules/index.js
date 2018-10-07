import { combineReducers } from 'redux';

import fetches from './fetches';

const appReducer = combineReducers({
  fetches,
});

export default (state, action) => appReducer(state, action);
