import { combineReducers } from 'redux';

import classes from './classes';
import events from './events';
import fetches from './fetches';
import locations from './locations';
import outreach from './outreach';
import pages from './pages';

const appReducer = combineReducers({
	classes,
	events,
	fetches,
	locations,
	outreach,
	pages,
});

export default (state, action) => appReducer(state, action);
