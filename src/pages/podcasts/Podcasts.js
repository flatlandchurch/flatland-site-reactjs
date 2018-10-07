import React from 'react';
import {
  PageCard,
  Jumbotron,
  PageNavigation,
  Lozenge,
  Button,
} from '@flatland/chokhmah';
import { Link } from 'react-router-dom';
import moment from 'moment';

import Meta from '../../components/meta';

import './Podcasts.css';

const Events = (props) => (
  <div className="page-wrapper">
    <Meta data={props.data.meta} />
    <Jumbotron
      title="Podcasts"
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
          props.podcasts.map((podcast) => (
            <div className="image-cards-card-wrapper" key={podcast.id}>
              <Link to={`/podcasts/${podcast.id}`}>
                <div className="card card-elevation--1 podcast-card">
                  <div>
                    <Lozenge color="#F45B69" label="Move to the Center" />
                  </div>
                  <div className="spacer" />
                  <h4>{podcast.attributes.title}</h4>
                  <p>{moment.unix(podcast.attributes.pubDate).format('MMMM D, YYYY')}</p>
                </div>
              </Link>
            </div>
          ))
        }
      </div>
      <div className="card-body center-button">
        <Button context="black" onClick={props.loadMore}>Load More</Button>
      </div>
    </PageCard>
  </div>
);

export default Events;
