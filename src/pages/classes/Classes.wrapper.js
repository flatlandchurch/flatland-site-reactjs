import React from 'react';
import { connect } from 'react-redux';
import { frontloadConnect } from 'react-frontload';
import _ from 'lodash';

import api from '../../utils/api';
import Classes from './Classes';
import { setPageData, setClassesData } from '../../modules/fetches';
import ValidPage from '../../utils/ValidPage';

const frontload = async (props) => {
  return await Promise.all([
    props.setPageData(await api.get('pages/move/classes')),
    props.setClassesData(await api.get('classes')),
  ]);
};

const mapStateToProps = (state) => ({
  data: state.fetches.pageData,
  classes: state.fetches.classes,
});

const mapDispatchToProps = (dispatch) => ({
  setPageData: (data) => {
    dispatch(setPageData(data));
  },
  setClassesData: (data) => {
    dispatch(setClassesData(data));
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
        checkKeys={['data', 'data.title', 'data.dates']}
        props={props}
      >
        <Classes data={props.data} classes={_.sortBy(props.classes, ['order', 'title'])} />
      </ValidPage>
    );
  })
);
