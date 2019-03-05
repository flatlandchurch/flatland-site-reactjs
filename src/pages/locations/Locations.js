import React from 'react';
import {
	PageCard,
	Jumbotron,
	Button,
	Stack,
} from '@flatland/chokhmah';
import qs from 'qs';
import { sortBy, get } from 'lodash';

import Meta from '../../components/meta';
import createStore from '../../store';
import LocationCard from './LocationCard';
import Form from '../../components/form';

import './Locations.css';

const { history } = createStore();

export default class Locations extends React.Component {
	constructor(props) {
		super(props);

		const params = qs.parse(props.location.search.replace('?', ''));

		this.scrollRef = React.createRef();

		this.state = {
			selectedLocation: params.location || 'flatland-144',
		};
	}

	handleLocationChange = (id) => () => {
		this.setState({ selectedLocation: id });
		history.push(`/visit?location=${id}`);
	};

	render() {
		const {
			data,
			locations,
		} = this.props;

		const selectedLocation = this.props.locations.length ?
			this.props.locations.find((loc) => loc.id === this.state.selectedLocation) :
			{};
		const timeChange = get(selectedLocation, 'attributes.timeChange.expires', 0) > new Date().getTime();

		return (
			<div className="page-wrapper">
				<Meta data={data.meta} />
				<Jumbotron
					title={data.callout}
					image={data.image}
				/>
				<div className="location-page-card">
					<PageCard>
						<div className="card-body">
							<h3>Locations</h3>
						</div>
						<div className="location-float-container">
							<div className="location-carousel-container">
								<div className="location-carousel" ref={this.scrollRef}>
									<div className="location-flex-container">
										{
											sortBy(locations, 'attributes.order').map((location) => (
												<LocationCard
													location={location}
													key={location.id}
													onClick={this.handleLocationChange}
													selected={this.state.selectedLocation === location.id}
												/>
											))
										}
									</div>
								</div>
							</div>
						</div>
						<div
							className="card-body"
							style={{ paddingTop: 0 }}
						>
							<div className="campus-information">
								<div className="campus-address">
									{
										get(selectedLocation, 'attributes.address.display', []).map((line) => (
											<p key={line}>{line}</p>
										))
									}
								</div>
								<Button>Directions</Button>
							</div>
							{
								timeChange &&
								<div className="time-change">
									<img src={get(selectedLocation, 'attributes.timeChange.image')} alt="time change announcement" />
									<Stack
										title={get(selectedLocation, 'attributes.timeChange.title')}
										content={get(selectedLocation, 'attributes.timeChange.message')}
									/>
								</div>
							}
							<h3>Times</h3>
							<div className="times-container">
								{
									get(selectedLocation, 'attributes.times', []).map(({ time, day }) => (
										<div
											key={`${day}-${time}`}
											className="card card-elevation--1 time-card"
										>
											<p className="time-day">
												{day}
											</p>
											<p><strong>{time}</strong></p>
										</div>
									))
								}
							</div>
							{
								get(selectedLocation, 'attributes.message') &&
								<Stack
									title={get(selectedLocation, 'attributes.messageTitle', '')}
									content={get(selectedLocation, 'attributes.message', '')}
								/>
							}
							{
								get(selectedLocation, 'attributes.faq') &&
								<Stack
									title="More Questions?"
									content={get(selectedLocation, 'attributes.faq', '')}
								/>
							}
							{
								!get(selectedLocation, 'attributes.private') &&
								<Form
									form={{
										title: 'Plan a Visit',
										formName: 'visit',
									}}
								/>
							}
						</div>
					</PageCard>
				</div>
			</div>
		);
	}
}
