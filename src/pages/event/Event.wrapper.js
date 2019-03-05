import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { frontloadConnect } from 'react-frontload';

import api from '../../utils/api';
import Event from './Event';
import { setEventData } from '../../modules/events';
import ValidPage from '../../utils/ValidPage';

const frontload = async (props) => {
  const permalink = _.get(props, 'match.params.permalink');
  if (props.data) return;
  return props.setEventData(await api.get(`events/${permalink}`))
};

const mapStateToProps = (state, props) => ({
  data: state.events.find((e) => e.permalink === _.get(props, 'match.params.permalink')),
});

const mapDispatchToProps = (dispatch) => ({
  setEventData: (data) => {
    dispatch(setEventData(data));
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
        checkKeys={['data', 'data.permalink', 'data.title']}
        props={props}
      >
        <Event data={props.data} />
      </ValidPage>
    );
  })
);
