import React from 'react';
import moment from 'moment';
import qs from 'qs';
import { Stack } from '@flatland/chokhmah';

import Tabs from '../../components/tabs';
import Announcements from './Announcements';
import Message from './Message';

import today from './today.json';

export default class Today extends React.Component {
	constructor(props) {
		super(props);

		const defaultTab = new Date().getDay() ? 'weekly-challenge' : 'announcements';

		const { tab } = qs.parse(this.props.location.search.replace('?', ''));

		const now = moment();
		const week = now.week();
		const year = now.year();

		this.week = `${year}-${week}`;

		this.state = {
			activeTabId: tab || defaultTab,
		};
	}

	componentDidMount() {
		if (!window.location.pathname.includes('weeks')) {
			window.history.replaceState({}, '', `/weeks/${this.week}`)
		}
	}

	handleTabChange = (activeTabId) => {
		this.setState({ activeTabId });
	};

	render() {
		const title = new Date().getDay ?
			`Week of ${moment().startOf('w').format('MMMM Do')}` :
			moment().format('MMMM D');

		return (
			<div className="page-wrapper">
				<div className="card-body">
					<div style={{ maxWidth: '900px', margin: '0 auto' }}>
						<h1 style={{ marginLeft: '2rem' }}>
							{title}
						</h1>
						<Tabs
							tabs={[
								{
									label: 'Announcements',
									id: 'announcements',
									content: (<Announcements items={today.announcements}
									/>)
								},
								{
									label: 'Message',
									id: 'message',
									content: (<Message
										title={today.message.title}
										content={today.message.content}
										week={this.week}
									/>)
								},
								{
									label: 'Weekly Challenge',
									id: 'weekly-challenge',
									content: (<Stack content={today.challenge.content} title="" />)
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
