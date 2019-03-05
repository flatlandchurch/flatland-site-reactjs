export const SET_PAGE_DATA = 'flatland/pages/SET_PAGE_DATA';

export function setPageData(key, data) {
	return {
		type: SET_PAGE_DATA,
		data,
		key,
	};
}

export default function fetches(state = {}, action) {
	switch(action.type) {
		case SET_PAGE_DATA:
			return Object.assign({}, state, {
				[action.key]: action.data,
			});
		default:
			return state;
	}
}