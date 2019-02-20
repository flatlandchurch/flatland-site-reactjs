import React from 'react';
import { connect } from 'react-redux';
import { frontloadConnect } from 'react-frontload';

import api from '../../utils/api';
import Podcasts from './Podcasts';
import ValidPage from '../../utils/ValidPage';
import { setPodcastData } from '../../modules/fetches';
import { setPageData } from '../../modules/pages';

const loadMore = (props) => async () => {
  const podcasts = await api.get('podcasts', { page: Math.floor(props.podcasts.length / 12) + 1 });
  props.setPodcastData([...props.podcasts, ...podcasts.data]);
};

const frontload = async (props) => {
  await props.setPageData({});
  return await Promise.all([
    props.setPageData(await api.get('pages/radio')),
    props.setPodcastData(await api.get('podcasts').then((data) => data.data)),
  ]);
};

const mapStateToProps = (state) => ({
  data: state.fetches.pageData,
  podcasts: state.fetches.podcasts,
});

const mapDispatchToProps = (dispatch) => ({
  setPageData: (data) => {
    dispatch(setPageData(data));
  },
  setPodcastData: (data) => {
    dispatch(setPodcastData(data));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  frontloadConnect(frontload, {
    onMount: true,
    onUpdate: false,
  })((props) => {
    return ((props.podcasts && props.podcasts.length) && props.data.title) ?
      <ValidPage
        checkKeys={['data.title', 'podcasts.length']}
        props={props}
      >
        <Podcasts
          data={props.data}
          podcasts={props.podcasts}
          loadMore={loadMore(props)}
          showLoadMore={!(props.podcasts % 10)}
        />
      </ValidPage> :
      <div />
  })
);
