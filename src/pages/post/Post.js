import React from 'react';
import {
  PageCard,
  Jumbotron,
  Stack,
  Breadcrumbs,
} from '@flatland/chokhmah';

import Meta from '../../components/meta';

const Post = (props) => (
  <div className="page-wrapper">
    <Meta
      data={{
        title: props.data.title,
        description: props.data.summary || 'Read blog posts from the Flatland Church.',
        image: props.data.image,
        canonical: `https://flatlandchurch.com/blog/${props.data.permalink}`,
      }}
    />
    <Jumbotron
      title={props.data.callout || props.data.title}
      image={props.data.image}
      byline={props.data.author.name}
    />
    <PageCard>
      <div className="card-body">
        <Breadcrumbs
          links={[
            { url: '/blog', label: 'Blog' }
          ]}
        />
        {
          props.data.topics.legacy ?
            <p dangerouslySetInnerHTML={{ __html: props.data.content }} /> :
            <Stack
              content={props.data.content}
              title={''}
            />
        }
      </div>
    </PageCard>
  </div>
);

export default Post;
