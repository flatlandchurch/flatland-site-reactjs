import { combineReducers } from 'redux';

import fetches from './fetches';
import events from './events';

const appReducer = combineReducers({
  fetches,
  events,
});

export default (state, action) => appReducer(state, action);
