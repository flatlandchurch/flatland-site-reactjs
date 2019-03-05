import React from 'react';
import _ from 'lodash';
import { lifecycle } from 'recompose';

const Child = ({ checkKeys, children, props }) => {
	let isValid;
	if (Array.isArray(checkKeys[0])) {
		isValid = checkKeys
			.map((keyArr) => !keyArr.some((key) => !_.get(props, key)))
			.some((k) => k);
	} else {
		isValid = !checkKeys.some((key) => !_.get(props, key));
	}
	return isValid ?
		<React.Fragment>{children}</React.Fragment> :
		<div />;
};

export default lifecycle({
	componentDidMount() {
		window.scrollTo(0, 0);
	},
})(Child);
