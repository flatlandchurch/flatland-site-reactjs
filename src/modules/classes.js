export const SET_CLASSES_DATA = 'flatland/classes/SET_CLASSES_DATA';
export const SET_CLASS_DATA = 'flatland/classes/SET_CLASS_DATA';

export function setClassesData(data) {
	return {
		type: SET_CLASSES_DATA,
		data,
	};
}

export function setClassData(data) {
	return {
		type: SET_CLASS_DATA,
		data,
	};
}

export default function classes(state = [], action) {
	switch (action.type) {
		case SET_CLASSES_DATA: return action.data;
		case SET_CLASS_DATA:
			state.push(action.data);
			return state;
		default: return state;
	}
}
