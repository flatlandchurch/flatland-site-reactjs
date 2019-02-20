export const SET_LOCATION_DATA = 'flatland/locations/SET_LOCATION_DATA';

export function setLocationData(data) {
	return {
		type: SET_LOCATION_DATA,
		data,
	};
}

export default function fetches(state = [], action) {
	switch(action.type) {
		case SET_LOCATION_DATA: return action.data;
		default:
			return state;
	}
}