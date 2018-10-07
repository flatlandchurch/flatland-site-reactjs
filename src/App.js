import '@flatland/chokhmah/dist/chokhmah.css';
import './App.css';

import React, { Component } from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Frontload } from 'react-frontload';
import { Provider } from 'react-redux';

import Layout from './layout/Layout';
import createStore from './store';

const { store, history } = createStore();

class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <Frontload noServerRender>
              <Layout />
            </Frontload>
          </ConnectedRouter>
        </Provider>
      </div>
    );
  }
}

class Server extends Component {
  render() {
    return (
      <Layout />
    );
  }
}

export default App;
export const AppServer = Server;
