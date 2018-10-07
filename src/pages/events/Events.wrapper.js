import React from 'react';
import { connect } from 'react-redux';
import { frontloadConnect } from 'react-frontload';

import api from '../../utils/api';
import Events from './Events';
import { setPageData, setEventsData } from '../../modules/fetches';
import ValidPage from '../../utils/ValidPage';

const frontload = async (props) => {
  return await Promise.all([
    props.setPageData(await api.get('pages/enjoy')),
    props.setEventsData(await api.get('events')),
  ]);
};

const mapStateToProps = (state) => ({
  data: state.fetches.pageData,
  events: state.fetches.events,
});

const mapDispatchToProps = (dispatch) => ({
  setPageData: (data) => {
    dispatch(setPageData(data));
  },
  setEventsData: (data) => {
    dispatch(setEventsData(data));
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
        checkKeys={['data', 'data.title', 'events.length']}
        props={props}
      >
        <Events data={props.data} events={props.events} />
      </ValidPage>
    );
  })
);
