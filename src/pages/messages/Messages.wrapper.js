import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { frontloadConnect } from 'react-frontload';

import Messages from './Messages';
import api from '../../utils/api';
import { setSermonsData, setSeriesData } from '../../modules/fetches';
import ValidPage from '../../utils/ValidPage';

const loadMore = (props) => async () => {
  const sermonPage = Math.floor(props.sermons.length / 12);
  const sermons = await api.get('sermons', { page: sermonPage + 1 });
  props.setSermonsData([...props.sermons, ...sermons]);
};

const frontload = async (props) => {
  const isSeries = props.match.url.includes('series');
  const sermons = await api.get('sermons');

  if (isSeries) {
    const series = await api.get('series');
    return Promise.all([
      props.setSeriesData(
        _.sortBy(series, ['started']).filter(d => d.permalink !== 'stand-alone-services').reverse(),
        sermons[0],
      ),
    ]);
  } else {
    return props.setSermonsData(sermons);
  }
};

const mapStateToProps = (state) => ({
  sermons: state.fetches.sermons,
  series: state.fetches.series,
  currentSermon: state.fetches.currentSermon,
});

const mapDispatchToProps = (dispatch) => ({
  setSermonsData: (data) => {
    dispatch(setSermonsData(data));
  },
  setSeriesData: (series, currentSermon) => {
    dispatch(setSeriesData(series, currentSermon));
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
    return (
      <ValidPage
        checkKeys={[
          ['sermons', 'sermons.length'],
          ['series', 'series.length'],
        ]}
        props={props}
      >
        <Messages
          sermons={props.sermons}
          series={props.series}
          loadMore={loadMore(props)}
          currentSermon={props.currentSermon}
          showLoadMore={!Boolean(props.series.length) && !Boolean(props.sermons.length % 12)}
        />
      </ValidPage>
    );
  })
);
