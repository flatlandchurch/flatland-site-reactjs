import React from 'react';
import { connect } from 'react-redux';
import { frontloadConnect } from 'react-frontload';

import api from '../../utils/api';
import Page from './Page';
import { setPageData } from '../../modules/pages';
import ValidPage from '../../utils/ValidPage';

const frontload = async (props) => {
  const { permalink, child } = props.match.params;
	const key = child ? `${permalink}/${child}` : permalink;

	if (props.data) return;

	return props.setPageData(key, await api.get(`pages/${key}`));
};

const mapStateToProps = (state, props) => {
	const { permalink, child } = props.match.params;
	const key = child ? `${permalink}/${child}` : permalink;
	return ({ data: state.pages[key] });
};

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
        checkKeys={['data', 'data.components', 'data.meta.title']}
        props={props}
      >
        <Page data={props.data} />
      </ValidPage>
    );
  })
);