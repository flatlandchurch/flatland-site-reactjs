import React from 'react';
import { connect } from 'react-redux';
import { frontloadConnect } from 'react-frontload';

import api from '../../utils/api';
import Groups from './Groups';
import { setPageData, setGroupData } from '../../modules/fetches';
import ValidPage from '../../utils/ValidPage';

const frontload = async (props) => {
  return await Promise.all([
    props.setPageData(await api.get('pages/move/groups')),
    props.setGroupData(await api.get('groups/pco')),
  ]);
};

const mapStateToProps = (state) => ({
  data: state.fetches.pageData,
  groups: state.fetches.groups,
});

const mapDispatchToProps = (dispatch) => ({
  setPageData: (data) => {
    dispatch(setPageData(data));
  },
  setGroupData: (data) => {
    dispatch(setGroupData(data));
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
        checkKeys={['data', 'data.meta', 'data.title', 'data.components.0']}
        props={props}
      >
        <Groups data={props.data} groups={props.groups} />
      </ValidPage>
    );
  })
);