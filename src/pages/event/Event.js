import React from 'react';
import {
  PageCard,
  Jumbotron,
  Stack,
  Action,
  AttachmentCard,
} from '@flatland/chokhmah';
import Meta from '../../components/meta';

const Event = (props) => {
  const startTimeDisplayString = props.data.details.startTimeDisplay ?
    `at ${props.data.details.startTimeDisplay}` :
    '';
  const endTimeDisplayString = props.data.details.endTimeDisplay ?
    `at ${props.data.details.endTimeDisplay}` :
    '';
  return (
    <div className="page-wrapper">
      <Meta
        data={{
          title: props.data.title,
          description: props.data.description.slice(0, 157) + '...',
          image: props.data.image,
          canonical: `https://flatlandchurch.com/enjoy/${props.data.permalink}`,
        }}
      />
      <Jumbotron
        title={props.data.title}
        image={props.data.jumbotron || props.data.image}
      />
      <PageCard>
        <div className="card-body">
          {
            props.data.details &&
            <div className="details-container">
              <div>
                <div>
                  <strong>Starts:</strong>
                  <div className="spacer" />
                  <span>{props.data.details.startDateDisplay} {startTimeDisplayString}</span>
                </div>
              </div>
              {
                props.data.details.endDateDisplay &&
                <div>
                  <div>
                    <strong>Ends:</strong>
                    <div className="spacer" />
                    <span>{props.data.details.endDateDisplay} {endTimeDisplayString}</span>
                  </div>
                </div>
              }
              {
                props.data.location &&
                <div>
                  <div>
                    <strong>Location:</strong>
                    <div className="spacer" />
                    <span>{props.data.location}</span>
                  </div>
                </div>
              }
              {
                props.data.details.cost &&
                <div>
                  <div>
                    <strong>Price:</strong>
                    <div className="spacer" />
                    <span>{props.data.details.cost}</span>
                  </div>
                </div>
              }
            </div>
          }
          <Stack
            content={props.data.description}
            title={''}
          />
          {
            props.data.inlineAction &&
            <Action data={props.data.inlineAction} black={false} />
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
        </div>
      </PageCard>
    </div>
  );
};

export default Event;
