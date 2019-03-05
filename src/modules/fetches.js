export const SET_GROUP_DATA = 'flatland/fetches/SET_GROUP_DATA';
export const SET_BLOG_DATA = 'flatland/fetches/SET_BLOG_DATA';
export const SET_SERMONS_DATA = 'flatland/fetches/SET_SERMONS_DATA';
export const SET_SERIES_DATA = 'flatland/fetches/SET_SERIES_DATA';
export const SET_PODCASTS_DATA = 'flatland/fetches/SET_PODCASTS_DATA';
export const RESET_PAGE_DATA = 'flatland/fetches/RESET_PAGE_DATA';

export function setGroupData(data) {
  return {
    type: SET_GROUP_DATA,
    groups: data,
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
  groups: [],
  posts: [],
  sermons: [],
  series: [],
  currentSermon: {},
  podcasts: [],
};

export default function fetches(state = initialState, action) {
  switch(action.type) {
    case SET_GROUP_DATA:
      return Object.assign({}, state, {
        groups: action.groups,
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
    default:
      return state;
  }
}
