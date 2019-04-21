import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Header from './header';
import Footer from './footer';

import Blog from '../pages/blog';
import Class from '../pages/class';
import Classes from '../pages/classes';
import Event from '../pages/event';
import Events from '../pages/events';
import Groups from '../pages/groups';
import Home from '../pages/home';
import Locations from '../pages/locations';
import Messages from '../pages/messages';
import Next from '../pages/next';
import NotFound from '../pages/notFound';
import Outreach from '../pages/outreach';
import Page from '../pages/page';
import Podcast from '../pages/podcast';
import Podcasts from '../pages/podcasts';
import Post from '../pages/post';
import Series from '../pages/series';
import Today from '../pages/today';
import Video from '../pages/video';

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
						<Route exact path="/outreach/:permalink" component={Outreach} />
						<Route exact path="/next" component={Next} />
						<Route exact path="/visit" component={Locations} />
						<Route exact path="/today" component={Today} />
						<Route exact path="/weeks/:week" component={Today} />
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