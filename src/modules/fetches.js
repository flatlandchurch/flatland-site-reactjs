export const SET_PAGE_DATA = 'flatland/fetches/SET_PAGE_DATA';
export const SET_GROUP_DATA = 'flatland/fetches/SET_GROUP_DATA';
export const SET_EVENTS_DATA = 'flatland/fetches/SET_EVENTS_DATA';
export const SET_CLASSES_DATA = 'flatland/fetches/SET_CLASSES_DATA';
export const SET_BLOG_DATA = 'flatland/fetches/SET_BLOG_DATA';
export const SET_SERMONS_DATA = 'flatland/fetches/SET_SERMONS_DATA';
export const SET_SERIES_DATA = 'flatland/fetches/SET_SERIES_DATA';
export const SET_PODCASTS_DATA = 'flatland/fetches/SET_PODCASTS_DATA';
export const RESET_PAGE_DATA = 'flatland/fetches/RESET_PAGE_DATA';

export function setPageData(data) {
  return {
    type: SET_PAGE_DATA,
    data,
  };
}

export function setGroupData(data) {
  return {
    type: SET_GROUP_DATA,
    groups: data,
  };
}

export function setEventsData(data) {
  return {
    type: SET_EVENTS_DATA,
    events: data,
  };
}

export function setClassesData(data) {
  return {
    type: SET_CLASSES_DATA,
    classes: data,
  };
}

export function setBlogData(data) {
  return {
    type: SET_BLOG_DATA,
    posts: data,
  };
}

export function setSermonsData(data) {
  return {
    type: SET_SERMONS_DATA,
    sermons: data,
  };
}

export function setSeriesData(series, currentSermon) {
  return {
    type: SET_SERIES_DATA,
    series,
    currentSermon,
  };
}

export function resetPageData() {
  return { type: RESET_PAGE_DATA };
}

export function setPodcastData(data) {
  return {
    type: SET_PODCASTS_DATA,
    podcasts: data,
  };
}

const initialState = {
  pageData: {},
  groups: [],
  events: [],
  classes: [],
  posts: [],
  sermons: [],
  series: [],
  currentSermon: {},
  podcasts: [],
};

export default function fetches(state = initialState, action) {
  switch(action.type) {
    case SET_PAGE_DATA:
      return Object.assign({}, state, {
        pageData: action.data,
      });
    case SET_GROUP_DATA:
      return Object.assign({}, state, {
        groups: action.groups,
      });
    case SET_EVENTS_DATA:
      return Object.assign({}, state, {
        events: action.events,
      });
    case SET_CLASSES_DATA:
      return Object.assign({}, state, {
        classes: action.classes,
      });
    case SET_BLOG_DATA:
      return Object.assign({}, state, {
        posts: action.posts,
      });
    case SET_SERMONS_DATA:
      return Object.assign({}, state, {
        series: [],
        sermons: action.sermons,
        currentSermon: action.sermons[0],
      });
    case SET_SERIES_DATA:
      return Object.assign({}, state, {
        series: action.series,
        currentSermon: action.currentSermon,
        sermons: [],
      });
    case SET_PODCASTS_DATA:
      return Object.assign({}, state, {
        podcasts: action.podcasts,
      });
    case RESET_PAGE_DATA:
      return Object.assign({}, state, {
        pageData: {},
      });
    default:
      return state;
  }
}
