import React from 'react';
import {
  PageCard,
  Jumbotron,
  Breadcrumbs,
} from '@flatland/chokhmah';
import moment from 'moment';

import Meta from '../../components/meta';

const Podcast = (props) => (
  <div className="page-wrapper">
    <Meta
      data={{
        title: props.data.attributes.title,
        description: 'Move to the Center Podcast with Bart Wilkins.',
        image: '',
        canonical: `https://flatlandchurch.com/podcasts/${props.data.id}`,
      }}
    />
    <Jumbotron
      title={props.data.attributes.title}
      byline={moment.unix(props.data.attributes.pubDate).format('MMMM D, YYYY')}
    />
    <PageCard>
      <div className="card-body">
        <Breadcrumbs
          links={[
            { url: '/podcasts', label: 'Podcasts' }
          ]}
        />
        <div className="audio-bar">
          <audio
            src={props.data.attributes.enclosure.url}
            controls
          />
        </div>
        <div dangerouslySetInnerHTML={{ __html: props.data.attributes.description }} />
      </div>
    </PageCard>
  </div>
);

export default Podcast;
