import React from 'react';
import {
  Jumbotron,
  PageCard,
  ImageCard,
  Button,
  PageNavigation,
} from '@flatland/chokhmah';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './Messages.css';
import Meta from '../../components/meta';

const Messages = (props) => {
  const actionData = Boolean(Object.keys(props.currentSermon).length) ?
    { internalUrl: `watch/${props.currentSermon.permalink}`, label: 'Watch Current Sermon' } :
    {};

  return(
    <div className="page-wrapper">
      <Meta
        data={{
          title: props.sermons.length ? 'Watch weekly sermons' : 'Sermon series and resources',
          description: props.sermons.length ?
            'Each week Flatland\'s teaching team prepares a Biblical message designed to inspire you to move to the center of God\'s kingdom.' :
            'Catch up on past sermons and explore our resources by our six-week sermon series.',
          image: props.currentSermon.image,
          canonical: props.sermons.length ?
            'https://flatlandchurch.com/watch' :
            'https://flatlandchurch.com/watch/series',
        }}
      />
      <Jumbotron
        title="Watch Weekly Sermons"
        image={props.currentSermon && props.currentSermon.image}
        action={actionData}
      />
      <PageCard>
        <PageNavigation
          navItems={[
            { internalUrl: '/watch', label: 'Sermons' },
            { internalUrl: '/watch/series', label: 'Series' },
          ]}
        />
        <div className="messages-card-body">
          {
            props.sermons.map((sermon) => (
              <div className="messages-image-card-wrapper" key={sermon.title}>
                <Link to={`/watch/${sermon.permalink}`}>
                  <ImageCard
                    internalUrl={`/watch/${sermon.permalink}`}
                    image={sermon.image}
                    alt={sermon.title}
                    title={sermon.title}
                    video
                    tag={sermon.series && sermon.series.title}
                  />
                </Link>
              </div>
            ))
          }
          {
            props.series.map((seriesItem) => (
              <div className="messages-image-card-wrapper" key={seriesItem.title}>
                <Link to={`/series/${seriesItem.permalink}`}>
                  <ImageCard
                    internalUrl={`/series/${seriesItem.permalink}`}
                    image={seriesItem.image}
                    alt={seriesItem.title}
                    title={seriesItem.title}
                    video
                  />
                </Link>
              </div>
            ))
          }
        </div>
        {
          props.showLoadMore &&
          <div className="card-body">
            <div className="messages-load-more">
              <Button
                block
                context="black"
                onClick={props.loadMore}
                disabled={props.loading}
              >
                {
                  props.loading ?
                    'Loading...' :
                    'Load More'
                }
              </Button>
            </div>
          </div>
        }
      </PageCard>
    </div>
  );
};

Messages.propTypes = {
  currentSermon: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  series: PropTypes.array,
  sermons: PropTypes.array,
  showLoadMore: PropTypes.bool,
  loadMore: PropTypes.func.isRequired,
};

Messages.defaultProps = {
  loading: false,
  series: [],
  sermons: [],
  showLoadMore: false,
};

export default Messages;
