import React from 'react';
import PropTypes from 'prop-types';
import { LazyLoadImage, trackWindowScroll } from 'react-lazy-load-image-component';
import { HomeCard, Link } from '@flatland/chokhmah';
import { Link as RouterLink } from 'react-router-dom';

import 'react-lazy-load-image-component/src/effects/blur.css';

import './Home.css';

import Meta from '../../components/meta';
import Video from './Video';

const Home = (props) => (
  <div className="home">
    <Meta data={props.data.meta} />
    <div className="home-jumbo-wrapper">
      <div className="home-jumbo">
        <Video
          callout={props.data.callout}
          image={props.data.image}
          scrollPosition={props.scrollPosition}
        />
      </div>
      <div className="home-jumbo-meta">
        <p>Flatland Church</p>
        <h1>{props.data.callout}</h1>
        <div className="home-jumbo-cta">
          <Link
            data={props.data.action}
            cta
          />
        </div>
      </div>
    </div>
    <div className="home-card-row">
      {
        props.data.homeCards.map((homeCard, idx) => (
          <RouterLink
            to={homeCard.internalUrl}
            key={`home-card-${idx}`}
          >
            <HomeCard
              title={homeCard.title}
              image={homeCard.image}
              description={homeCard.description}
            />
          </RouterLink>
        ))
      }
    </div>
    <div className="home-content">
      <p>{props.data.content}</p>
    </div>
    <div className="home-secondary-jumbo-wrapper">
      <div className="home-secondary-jumbo">
        <LazyLoadImage
          alt={props.data.secondJumbo.title}
          src={props.data.secondJumbo.image}
          effect="blur"
          scrollPosition={props.scrollPosition}
        />
      </div>
      <div className="home-secondary-jumbo-meta">
        <h3>{props.data.secondJumbo.title}</h3>
        <p>{props.data.secondJumbo.content}</p>
        <div className="home-secondary-jumbo-cta">
          <Link
            data={props.data.secondJumbo.action}
            cta
          />
        </div>
      </div>
    </div>
  </div>
);

Home.propTypes = {
  data: PropTypes.object.isRequired,
};

export default trackWindowScroll(Home);
