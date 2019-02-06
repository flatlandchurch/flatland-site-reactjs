export const SET_EVENTS_DATA = 'flatland/events/SET_EVENTS_DATA';
export const SET_EVENT_DATA = 'flatland/events/SET_EVENT_DATA';

export function setEventsData(data) {
  return {
    type: SET_EVENTS_DATA,
    data,
  };
}

export function setEventData(data) {
  return {
    type: SET_EVENT_DATA,
    data,
  };
}

export default function events(state = [], action) {
  switch (action.type) {
    case SET_EVENTS_DATA: return action.data;
    case SET_EVENT_DATA:
      state.push(action.data);
      return state;
    default: return state;
  }
}
