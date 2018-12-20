import React from 'react';
import { get } from 'lodash';
import { Stack } from '@flatland/chokhmah';

import api from '../../utils/api';

import './Location.css';

export default class Location extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {},
    };
  }

  componentDidMount() {
    api.get('/locations/flatland-144')
      .then(({ data }) => {
        this.setState({
          location: data.attributes,
        });
      });
  }

  render() {
    const timeChange = get(this.state, 'location.timeChange.expires', 0) > new Date().getTime();

    return (
      <div className="location">
        <p>
          <a href="https://www.google.com/maps/dir/''/flatland+church/@41.2991369,-96.1471382,14.43z/data=!4m8!4m7!1m0!1m5!1m1!1s0x8793edc40dfb7771:0xf3874f8166d2b53b!2m2!1d-96.1377491!2d41.3039804">
            Located on 144th Street between Maple and Fort
          </a>
        </p>
        {
          timeChange &&
          <div className="time-change">
            <img src={get(this.state, 'location.timeChange.image')} alt="time change announcement" />
            <Stack
              title={get(this.state, 'location.timeChange.title')}
              content={get(this.state, 'location.timeChange.message')}
            />
          </div>
        }
        <p>
          {
            timeChange &&
            <React.Fragment>
              <span>Regular Service Times:</span>
              <br />
            </React.Fragment>
          }
          <strong>
            Sunday, 9:30 &amp; 11:00
          </strong>
        </p>
      </div>
    );
  }
}
