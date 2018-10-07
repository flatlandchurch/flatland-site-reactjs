import React from 'react';
import {
  PageCard,
  Jumbotron,
  Stack,
  ImageCard,
} from '@flatland/chokhmah';
import { Link } from 'react-router-dom';

import EnhancedSeries from '../../components/enhancedSeries';
import Meta from '../../components/meta';

const Series = (props) => (
  <div className="page-wrapper">
    <Meta
      data={{
        title: props.data.title,
        description: props.data.description,
        image: props.data.image,
        canonical: `https://flatlandchurch.com/series/${props.data.permalink}`,
      }}
    />
    <Jumbotron
      title={props.data.title}
      image={props.data.image}
    />
    <PageCard>
      <div className="card-body">
        <Stack
          content={props.data.description}
          title={''}
        />
        {
          props.data.enhanced &&
            <EnhancedSeries data={props.data} />
        }
        {
          props.data.sermons &&
            <React.Fragment>
              <h3>Messages</h3>
              <div className="messages-card-body">
              {
                props.data.sermons.map((sermon) => (
                  <div className="messages-image-card-wrapper" key={sermon.title}>
                    <Link to={`/watch/${sermon.permalink}`}>
                      <ImageCard
                        image={sermon.image}
                        alt={sermon.title}
                        title={sermon.title}
                        video
                      />
                    </Link>
                  </div>
                ))
              }
              </div>
            </React.Fragment>
        }
      </div>
    </PageCard>
  </div>
);

export default Series;
