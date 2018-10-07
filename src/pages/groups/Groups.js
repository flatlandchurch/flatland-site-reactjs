import React from 'react';
import {
  PageCard,
  Jumbotron,
  PageNavigation,
  ImageCard,
  Stack,
} from '@flatland/chokhmah';

import Meta from '../../components/meta';

const Groups = (props) => (
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
          props.groups.map((group) => (
            <div className="image-cards-card-wrapper" key={group.externalUrl}>
              <a href={group.externalUrl}>
                <ImageCard
                  title={group.title}
                  image={group.image}
                  alt={group.title}
                >
                  <p>{group.schedule}</p>
                  {
                    group.location &&
                    <p>{group.location.approximate_address || group.location.name || ''}</p>
                  }
                </ImageCard>
              </a>
            </div>
          ))
        }
      </div>
    </PageCard>
  </div>
);

export default Groups;
