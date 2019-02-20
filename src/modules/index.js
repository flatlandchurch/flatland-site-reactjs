import { combineReducers } from 'redux';

import events from './events';
import fetches from './fetches';
import locations from './locations';
import pages from './pages';

const appReducer = combineReducers({
	events,
	fetches,
	locations,
	pages,
});

export default (state, action) => appReducer(state, action);
