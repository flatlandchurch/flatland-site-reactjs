import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { frontloadConnect } from 'react-frontload';

import api from '../../utils/api';
import Class from './Class';
import { setClassData } from '../../modules/classes';
import ValidPage from '../../utils/ValidPage';

const frontload = async (props) => {
	if (props.data) return;

	const permalink = _.get(props, 'match.params.permalink');
	const data = Object.assign({}, await api.get(`classes/${permalink}`), { permalink });
	return props.setClassData(data);
};

const mapStateToProps = (state, props) => ({
	data: state.classes.find((e) => e.permalink === _.get(props, 'match.params.permalink')),
});

const mapDispatchToProps = (dispatch) => ({
	setClassData: (data) => {
		dispatch(setClassData(data));
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
				checkKeys={['data', 'data.title', 'data.banner']}
				props={props}
			>
				<Class data={props.data} permalink={_.get(props, 'match.params.permalink')} />
			</ValidPage>
		);
	})
);
