import React from 'react';
import {
  PageCard,
  Jumbotron,
  PageNavigation,
  ImageCard,
  Stack,
  Lozenge,
} from '@flatland/chokhmah';
import cx from 'classnames';

import Meta from '../../components/meta';

const Classes = (props) => (
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
      <div className="card-body">
        <Stack
          content={props.data.components[0].contents[0].content}
          title={''}
        />
      </div>
      <div className="image-cards-card-body">
        {
          props.classes.map((classItem) => (
            <div
              className={cx('image-cards-card-wrapper', { featured: classItem.banner.featured })}
              key={classItem.permalink}
            >
              <a href={`/move/classes/${classItem.permalink}`}>
                <ImageCard
                  title={classItem.title}
                  image={classItem.image}
                  alt={classItem.title}
                  video
                >
                  <Lozenge label={classItem.banner.label} color={`#${classItem.banner.color}`} />
                </ImageCard>
              </a>
            </div>
          ))
        }
      </div>
    </PageCard>
  </div>
);

export default Classes;
