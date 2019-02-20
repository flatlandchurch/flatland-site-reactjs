import React from 'react';
import {
  PageCard,
  Jumbotron,
  PageNavigation,
  ImageCard,
} from '@flatland/chokhmah';
import { Link } from 'react-router-dom';
import { sortBy } from 'lodash';

import Meta from '../../components/meta';

import './Event.css';

const Events = (props) => (
  <div className="page-wrapper">
    <Meta data={props.data.meta} />
    <Jumbotron
      title={props.data.callout || props.data.title}
      image={props.data.image}
    />
    <PageCard>
      {
        Boolean(props.data.navigation && props.data.navigation.length) &&
        <PageNavigation
          navItems={props.data.navigation.map((n) => Object.assign({}, n, { label: n.title }))}
        />
      }
      <div className="image-cards-card-body">
        {
					sortBy(props.events, 'startsAt').map((event) => (
            <div className="image-cards-card-wrapper" key={event.permalink}>
              <Link
                to={
                  event.type === 'outreach' ?
                    `/outreach/${event.permalink}` :
                    `/enjoy/${event.permalink}`
                }
              >
                <ImageCard
                  title={event.title}
                  image={event.image}
                  alt={event.title}
                  tag={event.category.label}
                  tagColor={`#${event.category.color}`}
                >
                  <div className="event-footer">
                    <div className="spacer" />
                    {event.details && event.details.startDateDisplay}
                  </div>
                </ImageCard>
              </Link>
            </div>
          ))
        }
      </div>
    </PageCard>
  </div>
);

export default Events;
