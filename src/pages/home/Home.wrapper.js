import React from 'react';
import { connect } from 'react-redux';
import { frontloadConnect } from 'react-frontload';

import api from '../../utils/api';
import Home from './Home';
import { setPageData } from '../../modules/pages';
import ValidPage from '../../utils/ValidPage';

const frontload = async (props) => {
  if (props.data) return;
  return props.setPageData('home', await api.get('pages/home'));
};

const mapStateToProps = (state) => ({
  data: state.pages.home,
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
        checkKeys={['data', 'data.homeCards', 'data.meta']}
        props={props}
      >
        <Home data={props.data} />
      </ValidPage>
    );
  })
);
