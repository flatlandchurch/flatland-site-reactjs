import React from 'react';
import { connect } from 'react-redux';
import { frontloadConnect } from 'react-frontload';

import api from '../../utils/api';
import Page from './Page';
import { setPageData } from '../../modules/fetches';
import ValidPage from '../../utils/ValidPage';

const frontload = async (props) => {
  const { permalink, child } = props.match.params;
  if (child)  {
    return props.setPageData(await api.get(`pages/${permalink}/${child}`));
  } else {
    return props.setPageData(await api.get(`pages/${permalink}`));
  }
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
        checkKeys={['data', 'data.components', 'data.meta.title']}
        props={props}
      >
        <Page data={props.data} />
      </ValidPage>
    );
  })
);