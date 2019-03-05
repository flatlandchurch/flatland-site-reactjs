import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { frontloadConnect } from 'react-frontload';

import api from '../../utils/api';
import Outreach from './Outreach';
import { setOutreachData } from '../../modules/outreach';
import ValidPage from '../../utils/ValidPage';

const frontload = async (props) => {
	if (props.data) return;
	const permalink = _.get(props, 'match.params.permalink');
	const { data } = await api.get(`missions/${permalink}`);
	return props.setOutreachData(data);
};

const mapStateToProps = (state, props) => ({
	data: state.outreach.find((e) => e.id === _.get(props, 'match.params.permalink')),
});

const mapDispatchToProps = (dispatch) => ({
	setOutreachData: (data) => {
		dispatch(setOutreachData(data));
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
				checkKeys={['data', 'data.id', 'data.attributes']}
				props={props}
			>
				<Outreach data={props.data} />
			</ValidPage>
		);
	})
);
