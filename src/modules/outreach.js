export const SET_OUTREACHES_DATA = 'flatland/outreach/SET_OUTREACHES_DATA';
export const SET_OUTREACH_DATA = 'flatland/outreach/SET_OUTREACH_DATA';

export function setOutreachesData(data) {
	return {
		type: SET_OUTREACHES_DATA,
		data,
	};
}

export function setOutreachData(data) {
	return {
		type: SET_OUTREACH_DATA,
		data,
	};
}

export default function outreach(state = [], action) {
	switch (action.type) {
		case SET_OUTREACHES_DATA: return action.data;
		case SET_OUTREACH_DATA:
			state.push(action.data);
			return state;
		default: return state;
	}
}
