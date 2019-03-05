import React from 'react';
import { connect } from 'react-redux';
import { frontloadConnect } from 'react-frontload';

import api from '../../utils/api';
import Locations from './Locations';
import { setPageData } from '../../modules/pages';
import { setLocationData } from '../../modules/locations';
import ValidPage from '../../utils/ValidPage';

const frontload = async (props) => {
	if (!props.data) {
		props.setPageData('visit', await api.get(`pages/visit`));
	}

	if (!props.locations.length) {
		props.setLocationData(await api.get(`locations`));
	}
};

const mapStateToProps = (state) => ({
	data: state.pages.visit,
	locations: state.locations,
});

const mapDispatchToProps = (dispatch) => ({
	setPageData: (key, data) => {
		dispatch(setPageData(key, data));
	},
	setLocationData: ({ data }) => {
		dispatch(setLocationData(data));
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
				<Locations
					{...props}
					data={props.data}
					locations={props.locations}
				/>
			</ValidPage>
		);
	})
);