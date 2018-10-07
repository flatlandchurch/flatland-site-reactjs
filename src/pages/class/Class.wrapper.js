import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { frontloadConnect } from 'react-frontload';

import api from '../../utils/api';
import Class from './Class';
import { setPageData } from '../../modules/fetches';
import ValidPage from '../../utils/ValidPage';

const frontload = async (props) => {
  const permalink = _.get(props, 'match.params.permalink');
  return props.setPageData(await api.get(`classes/${permalink}`))
};

const mapStateToProps = (state) => ({
  data: state.fetches.pageData,
});

const mapDispatchToProps = (dispatch) => ({
  setPageData: (data) => {
    dispatch(setPageData(data));
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
        checkKeys={['data', 'data.meta', 'data.title']}
        props={props}
      >
        <Class data={props.data} permalink={_.get(props, 'match.params.permalink')} />
      </ValidPage>
    );
  })
);
