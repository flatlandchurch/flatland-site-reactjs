import React from 'react';
import {
	PageCard,
	Jumbotron,
	Stack,
	AttachmentCard,
} from '@flatland/chokhmah';

import DynamicForm from '../../components/dynamicForm';
import Meta from '../../components/meta';

const Outreach = (props) => {
	const { attributes } = props.data;
	const startTimeDisplayString = attributes.details.startTimeDisplay ?
		`at ${attributes.details.startTimeDisplay}` :
		'';
	const endTimeDisplayString = attributes.details.endTimeDisplay ?
		`at ${attributes.details.endTimeDisplay}` :
		'';

	return (
		<div className="page-wrapper">
			<Meta
				data={{
					title: attributes.title,
					description: attributes.description ? attributes.description.slice(0, 157) + '...' : '',
					image: attributes.image,
					canonical: `https://flatlandchurch.com/outreach/${attributes.permalink}`,
				}}
			/>
			<Jumbotron
				title={attributes.title}
				image={attributes.image}
			/>
			<PageCard>
				<div className="card-body">
					{
						attributes.details &&
						<div className="details-container">
							<div>
								<div>
									<strong>Starts:</strong>
									<div className="spacer" />
									<span>{attributes.details.startDateDisplay} {startTimeDisplayString}</span>
								</div>
							</div>
							{
								attributes.details.endDateDisplay &&
								<div>
									<div>
										<strong>Ends:</strong>
										<div className="spacer" />
										<span>{attributes.details.endDateDisplay} {endTimeDisplayString}</span>
									</div>
								</div>
							}
							{
								attributes.location &&
								<div>
									<div>
										<strong>Location:</strong>
										<div className="spacer" />
										<span>{attributes.location}</span>
									</div>
								</div>
							}
							{
								attributes.details.cost &&
								<div>
									<div>
										<strong>Participation Cost:</strong>
										<div className="spacer" />
										<span>{attributes.details.cost}</span>
									</div>
								</div>
							}
						</div>
					}
					{
						attributes.description &&
						<Stack
							content={attributes.description}
							title={''}
						/>
					}
					{
						props.data.attachments && Boolean(props.data.attachments.length) &&
						<React.Fragment>
							<h3>Downloads</h3>
							<div className="attachment-row">
								{
									props.data.attachments.map((download) => (
										<AttachmentCard
											label={download.title}
											fileSize={download.fileSize}
											fileUrl={download.externalUrl}
											key={download.externalUrl}
										/>
									))
								}
							</div>
						</React.Fragment>
					}
					{
						attributes.formId &&
						<DynamicForm formId={attributes.formId} />
					}
				</div>
			</PageCard>
		</div>
	);
};

export default Outreach;
