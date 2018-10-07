import React from 'react';
import { connect } from 'react-redux';
import { frontloadConnect } from 'react-frontload';

import api from '../../utils/api';
import Home from './Home';
import { setPageData } from '../../modules/fetches';
import ValidPage from '../../utils/ValidPage';

const frontload = async (props) => {
  return props.setPageData(await api.get('pages/home'));
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
        checkKeys={['data', 'data.homeCards', 'data.meta']}
        props={props}
      >
        <Home data={props.data} />
      </ValidPage>
    );
  })
);
