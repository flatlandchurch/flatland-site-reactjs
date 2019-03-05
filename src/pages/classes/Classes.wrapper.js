import React from 'react';
import { connect } from 'react-redux';
import { frontloadConnect } from 'react-frontload';
import _ from 'lodash';

import api from '../../utils/api';
import Classes from './Classes';
import { setClassesData } from '../../modules/classes';
import { setPageData } from '../../modules/pages';
import ValidPage from '../../utils/ValidPage';

const frontload = async (props) => {
	if (!props.data) {
		props.setPageData(await api.get('pages/move/classes'));
	}

	if (!props.classes || !props.classes.length) {
		props.setClassesData(await api.get('classes'));
	}
};

const mapStateToProps = (state) => ({
  data: state.pages['move/classes'],
  classes: state.classes,
});

const mapDispatchToProps = (dispatch) => ({
	setPageData: (data) => {
		dispatch(setPageData('move/classes', data));
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
				checkKeys={['data', 'data.title', 'data.components.0']}
				props={props}
			>
				<Classes data={props.data} classes={_.sortBy(props.classes, ['order', 'title'])} />
			</ValidPage>
		);
	})
);
