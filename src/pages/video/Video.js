import React from 'react';
import {
  PageCard,
  Lozenge,
  Action,
  Icon,
  ImageCard,
} from '@flatland/chokhmah';
import { Link } from 'react-router-dom';
import moment from 'moment';
import cx from 'classnames';
import _ from 'lodash';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';

import api from '../../utils/api';
import Meta from '../../components/meta';

import './Video.css';

export default class Video extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false,
      player: null,
      seriesVideos: [],
    };
  }

  componentDidMount() {
    const iframe = document.querySelector('iframe');
    const player = new window.Vimeo.Player(iframe);
    this.setState({ player });

    player.on('pause', () => {
      this.setState({ isPlaying: false });
    });

    player.on('play', () => {
      this.setState({ isPlaying: true });
    });

    if (this.props.data.series) {
      api.get(`series/${this.props.data.series.permalink}`)
        .then((data) => {
          this.setState({ seriesVideos: _.sortBy(data.sermons, ['preached']) });
        });
    }
  }

  componentWillUnmount() {
    this.state.player.off('play');
    this.state.player.off('pause');
  }

  playVideo = () => {
    this.setState((ps) => ({ isPlaying: !ps.isPlaying }),
      () => {
        if (this.state.isPlaying) {
          this.state.player.play();
        } else {
          this.state.player.pause();
        }
      });
  };

  pauseVideo = () => {
    this.state.player.pause();
  };

  render() {
    return (
      <div style={{ overflow: 'hidden' }}>
        <Meta
          data={{
            title: this.props.data.title,
            description: this.props.data.series ?
              this.props.data.series.description :
              'Watch weekly sermons from Flatland Church',
            image: this.props.data.image,
            canonical: `https://flatlandchurch.com/watch/${this.props.permalink}`,
          }}
        />
        <div className="video-container">
          {
            !this.state.isPlaying &&
              <React.Fragment>
                <div
                  className="video-play-icon-button"
                  onClick={this.playVideo}
                >
                  <Icon>Play</Icon>
                </div>
                <div className="video-image-blur">
                  <LazyLoadImage
                    alt={this.props.data.title}
                    src={this.props.data.image}
                    effect="opacity"
                  />
                </div>
              </React.Fragment>
          }
          <div
            className="video-scrollable"
            onClick={this.pauseVideo}
          />
          <iframe
            src={`https://player.vimeo.com/video/${this.props.data.vimeoId}`}
            width="640"
            height="360"
            frameBorder="0"
            webkitallowfullscreen="true"
            mozallowfullscreen="true"
            allowFullScreen
            title={this.props.data.title}
            allow="autoplay"
          />
        </div>
        <div className={cx('video-page-card-wrapper', { playing: this.state.isPlaying })}>
          <PageCard>
            <div className="card-body">
              <h3>{this.props.data.title}</h3>
              <div className="video-series-meta">
                {
                  this.props.data.series &&
                  <Link
                    to={`/series/${this.props.data.series.permalink}`}
                  >
                    <Lozenge
                      label={this.props.data.series.title}
                    />
                  </Link>
                }
              </div>
              <div className="video-meta">
                <p>{this.props.data.speaker.name}</p>
                <p style={{ fontSize: '16px' }}>
                  {moment.unix(this.props.data.preached).format('MMMM D, YYYY')}
                </p>
              </div>
              <p>
                {
                  this.props.data.series ?
                    this.props.data.series.description :
                    ''
                }
              </p>
              <Action
                data={{
                  internalUrl: `/series/${this.props.data.series.permalink}`,
                  label: 'Resources',
                }}
              />

              {
                this.props.data.series &&
                <React.Fragment>
                  <h4>More from this series</h4>
                  <div className="messages-card-body">
                    {
                      this.state.seriesVideos.map((video) => (
                        <div className="messages-image-card-wrapper" key={video.title}>
                          <Link to={`/watch/${video.permalink}`}>
                            <ImageCard
                              image={video.image}
                              alt={video.title}
                              title={video.title}
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
      </div>
    )
  }
}
