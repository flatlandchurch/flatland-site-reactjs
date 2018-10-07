import React from 'react';
import { Stack } from '@flatland/chokhmah';
import _ from 'lodash';

import './NotFound.css';

import messages from './messages';

const NotFound = () => (
  <div className="not-found-wrapper">
    <h1>Page Not Found</h1>
    <div className="page-card">
      <div className="card-body">
        <Stack
          content={_.sample(messages)}
          title=""
        />
      </div>
    </div>
  </div>
);

export default NotFound;
