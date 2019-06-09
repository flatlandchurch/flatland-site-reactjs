import React from 'react';
import styled from 'styled-components';
import {
	TextField,
	Button,
} from '@flatland/chokhmah';
import moment from 'moment';

import api from '../../utils/api';

const RibbonStyled = styled.div`
  width: 100%;
  max-width: 400px;
  background: ${props => (props.active ? "#00A6FB" : "#fff")};
  box-shadow: 0px 4px 15px 0px rgba(0, 0, 0, 0.1);
  border-radius: 50px;
  padding: 12px 25px;
  text-align: left;
  box-sizing: border-box;
  margin: 8px 0;
  transition: background 0.2s ease-out, color 0.2s ease-out;
  color: ${props => (props.active ? "#fff" : "rgba(0, 0, 0, 0.75)")};
  cursor: pointer;
  outline: none;
  display: grid;
  grid-template-columns: 1fr max-content;
  align-items: center;
  grid-column-gap: 8px;
`;

const Options = styled.div`
	border-bottom: 1px solid #dfe0e2;
	padding-bottom: 1rem;
`;

const Form = styled.form`
	max-width: 420px;
`;

const Ribbon = props => {
	const {
		children,
		...rest
	} = props;

	return (
		<RibbonStyled tabIndex={0} role="button" {...rest}>
			<span>{children}</span>
			{
				props.active &&
				<i className="material-icons">check</i>
			}
		</RibbonStyled>
	);
};

class Response extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			ribbons: {},
			name: '',
			email: '',
			options: [
				'I accepted Jesus today',
				'I recommitted my life to the Lord today',
				'I am ready to be baptized',
				...this.props.options,
			],
			otherText: '',
			sending: false,
			sent: false,
		};
	}

	toggleRibbonActive = (option) => () => {
		this.setState((prevState) => ({
			ribbons: {
				...prevState.ribbons,
				[option]: !prevState.ribbons[option],
			},
			otherText: option === 'other' ? '' : prevState.otherText,
		}));
	};

	handleChange = (field) => (value) => {
		this.setState({ [field]: value });
	};

	handleForm = (e) => {
		e.preventDefault();
		this.setState({ sending: true });

		const numbers = Object
			.keys(this.state.ribbons)
			.filter((k) => !isNaN(parseInt(k, 10)) && this.state.ribbons[k])
			.map((k) => parseInt(k, 10));
		const selectedOptions = this.state.options.filter((_, i) => numbers.includes(i));

		if (this.state.ribbons.other && this.state.otherText) {
			selectedOptions.push(`Other: ${this.state.otherText}`);
		}

		const data = {
			name: this.state.name,
			email: this.state.email,
			date: moment().format('M/D/YYYY'),
			response: selectedOptions.join('; '),
		};

		api.post(`forms/c9ea7813-bc4d-48ed-b9ae-f25791b255d9`, data)
			.then(() => this.setState({
				sending: false,
				sent: true,
			}));
	};

	render() {
		return (
			<>
				{
					this.state.sent ?
						<h4>We're so excited to see how God is moving in your life as you move closer to the center of His Kingdom. We'll be in contact with you this week to follow up.</h4> :
						<>
							<Options>
								{
									this.state.options.map((option, index) => (
										<Ribbon
											onClick={this.toggleRibbonActive(index)}
											active={this.state.ribbons[index]}
											key={`response-ribbon-${index}`}
										>
											{option}
										</Ribbon>
									))
								}
								<Ribbon
									onClick={this.toggleRibbonActive('other')}
									active={this.state.ribbons.other}
								>
									Other
								</Ribbon>
								{
									this.state.ribbons.other &&
									<>
										<TextField
											textarea
											noResize
											label="Tell us more"
											onChange={this.handleChange('otherText')}
											value={this.state.otherText}
										/>
									</>
								}
							</Options>
							<Form onSubmit={this.handleForm}>
								<TextField
									label="Name"
									required
									onChange={this.handleChange('name')}
									value={this.state.name}
								/>
								<TextField
									label="Email"
									required
									type="email"
									onChange={this.handleChange('email')}
									value={this.state.email}
								/>
								{
									this.state.sending ?
										<p>Sending...</p> :
										<Button context="primary">
											Respond
										</Button>
								}
							</Form>
						</>
				}
			</>
		);
	}
}

export default Response;