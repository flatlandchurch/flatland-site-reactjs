import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Header from './header';
import Footer from './footer';

import Home from '../pages/home';
import Page from '../pages/page';
import Messages from '../pages/messages';
import Video from '../pages/video';
import Events from '../pages/events';
import Event from '../pages/event';
import Groups from '../pages/groups';
import Classes from '../pages/classes';
import Class from '../pages/class';
import Series from '../pages/series';
import Blog from '../pages/blog';
import Post from '../pages/post';
import Podcasts from '../pages/podcasts';
import Podcast from '../pages/podcast';
import Next from '../pages/next';
import NotFound from '../pages/notFound';

export default class Layout extends React.Component {
  render() {
    return (
      <div id="wrapper">
        <Header/>
        <div className="content-wrapper">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              exact
              path="/watch"
              render={({ match }) => (<Messages match={match} key={match.url} />)}
            />
            <Route
              exact
              path="/watch/series"
              render={({ match }) => (<Messages match={match} key={match.url} />)}
            />
            <Route
              path="/watch/:permalink"
              render={({ match }) => (<Video match={match} key={match.url} />)}
            />
            <Route exact path="/enjoy" component={Events} />
            <Route path="/enjoy/:permalink" component={Event} />
            <Route path="/move/groups" component={Groups} />
            <Route exact path="/move/classes" component={Classes} />
            <Route path="/move/classes/:permalink" component={Class} />
            <Route path="/series/:permalink" component={Series} />
            <Route exact path="/blog" component={Blog} />
            <Route path="/blog/:permalink" component={Post} />
            <Route exact path="/podcasts" component={Podcasts} />
            <Route exact path="/radio" component={Podcasts} />
            <Route path="/podcasts/:permalink" component={Podcast} />
            <Route exact path="/next" component={Next} />
            <Route path="/404" render={() => (<NotFound />)} />
            <Route path="/index.html" render={() => (<Redirect to="/" />)} />
            <Route
              exact
              path="/:permalink"
              render={({ match }) => (<Page match={match} key={match.url} />)}
            />
            <Route
              path="/:permalink/:child"
              render={({ match }) => (<Page match={match} key={match.url} />)}
            />
            <Route path="*" render={() => (<NotFound />)} />
          </Switch>
        </div>
        <Footer/>
      </div>
    );
  }
}