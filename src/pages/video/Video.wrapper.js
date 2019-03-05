import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { frontloadConnect } from 'react-frontload';

import Video from './Video';
import api from '../../utils/api';
import { setPageData } from '../../modules/pages';
import ValidPage from '../../utils/ValidPage';

const frontload = async (props) => {
  const permalink = _.get(props, 'match.params.permalink');
  return props.setPageData(`sermons/${permalink}`, await api.get(`sermons/${permalink}`));
};

const mapStateToProps = (state, props) => ({
  data: state.pages[`sermons/${_.get(props, 'match.params.permalink')}`],
});

const mapDispatchToProps = (dispatch) => ({
  setPageData: (key, data) => {
    dispatch(setPageData(key, data));
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
        checkKeys={['data', 'data.title', 'data.title', 'data.vimeoId']}
        props={props}
      >
        <Video data={props.data} permalink={_.get(props, 'match.params.permalink')} />
      </ValidPage>
    );
  })
);