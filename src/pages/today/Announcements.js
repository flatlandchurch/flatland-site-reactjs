import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Markdown } from '@flatland/chokhmah';

const Card = styled.div`
	box-shadow: 0 1px 4px 0 rgba(0,0,0,.25);
	border: 1px solid #fff;
	padding: 12px;
	background: #fff;
	margin: 16px 0;
	border-radius: 4px;
	font-size: 16px;
	
	a, p {
		color: rgba(0,0,0,.75);
		white-space: pre-wrap;
	}
	
	strong {
		margin-bottom: 8px;
		display: block;
	}
	
	& > * {
		margin: 0;
	}
`;

const Announcements = ({ items = [] }) => (
	<div className="">
		{
			items.map((a) => (
				a.internalUrl ?
					<Link
						to={a.internalUrl}
						key={a.id}
					>
						<Card>
							<p><strong>{a.title}</strong></p>
							<Markdown content={a.description }/>
						</Card>
					</Link> :
					<Card
						key={a.id}
					>
						<p><strong>{a.title}</strong></p>
						<Markdown content={a.description }/>
					</Card>
			))
		}
	</div>
);

export default Announcements;
