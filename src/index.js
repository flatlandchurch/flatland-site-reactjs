import React from 'react';
import ReactDOM from 'react-dom';
import Loadable from 'react-loadable';

import './index.css';
import App from './App';

if (process.env.NODE_ENV === 'production') {
  Loadable.preloadReady().then(() => {
    ReactDOM.hydrate(<App />, document.getElementById('root'));
  });
} else {
  ReactDOM.render(<App />, document.getElementById('root'));
}
