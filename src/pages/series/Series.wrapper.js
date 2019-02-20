import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { frontloadConnect } from 'react-frontload';

import api from '../../utils/api';
import Series from './Series';
import { setPageData } from '../../modules/pages';
import ValidPage from '../../utils/ValidPage';

const frontload = async (props) => {
  const permalink = _.get(props, 'match.params.permalink');
  const series = await api.get(`series/${permalink}`);
  const sermons = _.sortBy(series.sermons, ['preached']);
  return;
  // return props.setPageData(Object.assign({}, series, { sermons }));
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
        checkKeys={['data', 'data.title', 'data.title', 'data.description']}
        props={props}
      >
        <Series data={props.data} />
      </ValidPage>
    );
  })
);
