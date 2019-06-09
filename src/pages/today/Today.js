import React from 'react';
import moment from 'moment';
import qs from 'qs';
import { Stack } from '@flatland/chokhmah';
import { get } from 'lodash';

import Tabs from '../../components/tabs';
import Meta from '../../components/meta';
import Announcements from './Announcements';
import Message from './Message';
import api from '../../utils/api';

export default class Today extends React.Component {
	constructor(props) {
		super(props);

		const { week: weekParam } = get(this.props, 'match.params', {});

		console.log(weekParam);

		const defaultTab = new Date().getDay() ? 'weekly-challenge' : 'announcements';

		const { tab } = qs.parse(this.props.location.search.replace('?', ''));

		const now = moment();
		const week = now.week();
		const year = now.year();

		this.week = weekParam || `${year}-${week}`;
		this.title = `Week of ${moment().isoWeek(this.week.split('-')[1] - 1).startOf('w').format('MMMM Do')}`;

		this.state = {
			activeTabId: tab || defaultTab,
			today: {},
		};
	}

	componentDidMount() {
		this.getData();
		if (!window.location.pathname.includes('weeks')) {
			window.history.replaceState({}, '', `/weeks/${this.week}`)
		}
	}

	handleTabChange = (activeTabId) => {
		this.setState({ activeTabId });
	};

	getData = async () => {
		const data = await api.get(`/weeks/${this.week}`);
		this.setState({ today: data });
	};

	render() {
		const { today } = this.state;

		return (
			<div className="page-wrapper">
				<Meta
					data={{
						title: this.title,
						canonical: `https://flatlandchurch.com/weeks/${this.week}`,
						description: `Follow along with the service, see what's new, take notes, and take the weekly Move to the Center challenge.`,
					}}
				/>
				<div className="card-body">
					<div style={{ maxWidth: '900px', margin: '0 auto' }}>
						<h1 style={{ marginLeft: '2rem' }}>
							{this.title}
						</h1>
						<Tabs
							tabs={[
								{
									label: 'Announcements',
									id: 'announcements',
									content: (
										this.state.today.announcements ?
											<Announcements items={today.announcements} /> :
											<div />
									)
								},
								{
									label: 'Message',
									id: 'message',
									content: (
										this.state.today.message ?
											<Message
												title={today.message.title}
												content={today.message.content}
												response={today.response}
												week={this.week}
											/> :
											<div />
									)
								},
								{
									label: 'Weekly Challenge',
									id: 'weekly-challenge',
									content: (
										this.state.today.challenge ?
											<Stack content={today.challenge.content} title="" /> :
											<div />
									)
								},
							]}
							activeTabId={this.state.activeTabId}
							onChange={this.handleTabChange}
						/>
					</div>
				</div>
			</div>
		);
	}
}
