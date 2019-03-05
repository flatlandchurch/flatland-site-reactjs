import React from 'react';
import cx from 'classnames';

import './Locations.css';

export default (props) => (
	<div
		className={cx(
			'card',
			'location-card',
			{
				'card-elevation--2': props.selected,
				'card-elevation--1': !props.selected,
				'location-card-selected': props.selected,
			}
		)}
		onClick={props.onClick(props.location.id)}
		onKeyDown={(e) => {
			if (e.key === 'Enter') {
				props.onClick(props.location.id)(e);
			}
		}}
		role="button"
		tabIndex={0}
	>
		{
			props.location.attributes.preview &&
				<div className="location-preview">
					Preview
				</div>
		}
		<div className="location-image-container">
			<img
				src={props.location.attributes.image}
				alt={`${props.location.attributes.name} building`}
			/>
		</div>
		<p>
			{props.location.attributes.name}
		</p>
		{
			props.selected &&
			<div className="location-selected" />
		}
	</div>
);
