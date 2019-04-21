import React from 'react';
import { connect } from 'react-redux';
import { frontloadConnect } from 'react-frontload';

import api from '../../utils/api';
import Events from './Events';
import { setPageData } from '../../modules/pages';
import { setEventsData } from '../../modules/events';
import ValidPage from '../../utils/ValidPage';

const frontload = async (props) => {
  if (!props.data) {
		props.setPageData('enjoy', await api.get('pages/enjoy'));
  }

  // TODO: Add check to validate list
  if (!props.events || !props.events.length || props.events.length === 1) {
		props.setEventsData(await api.get('events'));
  }
};

const mapStateToProps = (state) => ({
	data: state.pages.enjoy,
	events: state.events,
});

const mapDispatchToProps = (dispatch) => ({
	setPageData: (key, data) => {
		dispatch(setPageData(key, data));
	},
	setEventsData: (data) => {
		dispatch(setEventsData(data));
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
	  console.log(props);
		return (
			<ValidPage
				checkKeys={['data', 'data.title', 'events.length']}
				props={props}
			>
				<Events data={props.data} events={props.events} />
			</ValidPage>
		);
	})
);
