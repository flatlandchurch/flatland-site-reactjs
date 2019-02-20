import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { frontloadConnect } from 'react-frontload';

import api from '../../utils/api';
import Post from './Post';
import { setPageData } from '../../modules/pages';
import ValidPage from '../../utils/ValidPage';

const frontload = async (props) => {
  const permalink = _.get(props, 'match.params.permalink');
  return props.setPageData(await api.get(`blog/${permalink}`))
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
        checkKeys={['data', 'data.content', 'data.title']}
        props={props}
      >
        <Post data={props.data} />
      </ValidPage>
    );
  })
);
