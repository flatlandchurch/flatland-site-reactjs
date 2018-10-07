import React from 'react';
import {
  PageCard,
  Jumbotron,
  Stack,
  ScheduleCard,
} from '@flatland/chokhmah';
import moment from 'moment';

import Meta from '../../components/meta';

const Class = (props) => (
  <div className="page-wrapper">
    <Meta
      data={{
        title: props.data.title,
        image: props.data.image,
        description: props.data.description,
        canonical: `https://flatlandchurch.com/move/classes/${props.permalink}`,
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
                <strong>Childcare:</strong>
                <div className="spacer" />
                <span>
                  {
                    props.data.details.children ?
                      'Available' :
                      'Not Available'
                  }
                </span>
              </div>
            </div>
            <div>
              <div>
                <strong>Price:</strong>
                <div className="spacer" />
                <span>
                  {
                    props.data.details.cost ?
                      `$${props.data.details.cost}` :
                      'Free'
                  }
                </span>
              </div>
            </div>
          </div>
        }
        {
          props.data.description &&
          <Stack
            content={props.data.description}
            title={''}
          />
        }
        {
          props.data.dates &&
            <React.Fragment>
              <h3>Dates</h3>
              {
                Object.keys(props.data.dates)
                  .map((k) => ({ ...props.data.dates[k] }))
                  .filter((date) => date.end ?
                    date.end > moment().unix() :
                    date.start > moment().unix()
                  )
                  .map((date) => (
                    <ScheduleCard
                      start={date.start}
                      end={date.end}
                      time={date.time}
                      key={date.start}
                      action={date.inlineAction}
                    />
                  ))
              }
            </React.Fragment>
        }
      </div>
    </PageCard>
  </div>
);

export default Class;
