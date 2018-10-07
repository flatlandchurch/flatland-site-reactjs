import React from 'react';
import PropTypes from 'prop-types';
import {
  AttachmentCard,
  Lozenge,
  Icon,
} from '@flatland/chokhmah';

import './EnhancedSeries.css';

const style = {
  maxWidth: '700px',
  marginLeft: 'auto',
  marginRight: 'auto',
};

const EnhancedSeries = (props) => (
  <React.Fragment>
    <h3>Resources</h3>

    {
      props.data.featuredVideo &&
        <div className="resource-video-container" style={style}>
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${props.data.featuredVideo.youtubeId}?rel=0&amp;showinfo=0`}
            frameBorder="0"
            allow="encrypted-media"
            allowFullScreen
            title={props.data.featuredVideo.title}
          />
        </div>
    }

    <h4>Downloads</h4>
    <div style={style} className="enhanced-series-attachments">
      {
        props.data.downloads.map((download) => (
          <AttachmentCard
            label={download.title}
            fileSize={download.fileSize}
            fileUrl={download.externalUrl}
            key={download.externalUrl}
          />
        ))
      }
    </div>

    <h4>Suggested Reading</h4>
    {
      props.data.featuredBook &&
      <div className="card card-elevation--1 featured-resource">
        <div style={{ marginBottom: '12px' }}>
          <Lozenge label="featured" />
        </div>
        <p><strong>{props.data.featuredBook.title} by {props.data.featuredBook.author}</strong></p>
        <p>{props.data.featuredBook.description}</p>
        <p><a href={props.data.featuredBook.externalUrl}>Check it out on Amazon.</a></p>
      </div>
    }
    <ul>
      {
        props.data.books.map((book) => (
          <li key={book.externalUrl}><a href={book.externalUrl}>{book.title} by {book.author}</a></li>
        ))
      }
    </ul>

    {
      props.data.worship &&
      <React.Fragment>
        <div className="title-icon-header">
          <h4>Worship</h4>
          <div className="spacer" />
          <a href={props.data.worship.playlist}>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/flatland-api.appspot.com/o/Spotify_Icon_RGB_Green.png?alt=media&token=91bf94a0-ce66-40df-a0cb-8a372e26b860"
              alt="Spotify logo"
            />
          </a>
        </div>
        <p>{props.data.worship.message}</p>
        <div style={style}>
          {
            props.data.worship.setList.map((song) => (
              <div className="card card-elevation--1 song-card" key={song.externalUrl}>
                <div className="song-meta">
                  <p><strong>{song.title}</strong></p>
                  <p className="artist">{song.author}</p>
                </div>
                <div className="spacer" />
                <a href={song.externalUrl}>
                  <div className="song-play-btn">
                    <Icon>PlayArrow</Icon>
                  </div>
                </a>
              </div>
            ))
          }
        </div>
      </React.Fragment>
    }

  </React.Fragment>
);

EnhancedSeries.propTypes = {
  data: PropTypes.object.isRequired,
};

export default EnhancedSeries;
