import React from 'react';

import './Location.css';

export default class Location extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      asterisk: false,
      message: '',
    };
  }

  componentDidMount() {
    fetch('https://api.flatlandchurch.com/v1/times/changes')
      .then((data) => data.json())
      .then((data) => {
        this.setState({
          asterisk: data.has_change,
          message: data.message,
        });
      });
  }

  render() {
    return (
      <div className="location">
        <p>
          <a href="https://www.google.com/maps/dir/''/flatland+church/@41.2991369,-96.1471382,14.43z/data=!4m8!4m7!1m0!1m5!1m1!1s0x8793edc40dfb7771:0xf3874f8166d2b53b!2m2!1d-96.1377491!2d41.3039804">
            Located on 144th Street between Maple and Fort
          </a>
        </p>
        <p>
          <strong>
            Sunday, 9:30 &amp; 11:00
            {
              this.state.asterisk &&
                '*'
            }
          </strong>
        </p>
        {
          this.state.asterisk && this.state.message &&
            <p style={{ fontSize: '14px' }}>* {this.state.message}</p>
        }
      </div>
    );
  }
}
