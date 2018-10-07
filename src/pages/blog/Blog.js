import React from 'react';
import {
  PageCard,
  Jumbotron,
  PageNavigation,
  ImageCard,
  Button,
} from '@flatland/chokhmah';
import { Link } from 'react-router-dom';
import Meta from '../../components/meta';

const Blog = (props) => (
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
          props.posts.map((post) => (
            <div className="image-cards-card-wrapper" key={post.permalink}>
              <Link to={`/blog/${post.permalink}`}>
                <ImageCard
                  title={post.title}
                  image={post.image}
                  alt={post.title}
                  tag={Object.keys(post.topics)[0]}
                />
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

export default Blog;
