import React from 'react';
import { Header, Icon, Search } from '@flatland/chokhmah';
import cx from 'classnames';

import handleKeyDown from '../../utils/handleKeyDown';

import api from '../../utils/api';
import Menu from '../menu';
import './Header.css';

export default class AppHeader extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			redBar: {},
			menuOpen: false,
			searchOpen: false,
			searchValue: '',
			searchResults: [],
		};
	}

	componentDidMount() {
		api.get('redBar')
			.then((data) => {
				const notifDismissed = window.localStorage.getItem(`flatland:redBar:${data.guid}:dismissed`);
				if (!notifDismissed && data.expires > new Date().getTime()) {
					this.setState({ redBar: data });
				}
			});
	}

	closeNotification = () => {
		const { guid } = this.state.redBar;
		window.localStorage.setItem(`flatland:redBar:${guid}:dismissed`, true);
		this.setState({ redBar: {} });
	};

	toggleMenuState = () => {
		this.setState((prevState) => ({ menuOpen: !prevState.menuOpen }),
			() => {
				if (this.state.menuOpen) {
					document.body.style.overflow = 'hidden';
				} else {
					document.body.style.overflow = 'inherit';
				}
			});
	};

	toggleSearch = () => {
		this.setState((prevState) => ({
			searchOpen: !prevState.searchOpen,
			searchResults: [],
		}));
	};

	handleNavigation = (route) => () => {
		window.location.href = `/${route}`;
	};

	handleSearch = (searchValue) => {
		this.setState({ searchValue }, () => {
			if (this.state.searchValue && this.state.searchValue.length > 2) {
				api.get('search', { q: this.state.searchValue })
					.then(({ data }) => this.setState({ searchResults: data }));
			}
		});
	};

	render() {
		return (
			<React.Fragment>
				{
					Boolean(Object.keys(this.state.redBar).length) &&
					<div className={cx('notification-bar', this.state.redBar.type)}>
						<p>
							{this.state.redBar.title}
							<a href={this.state.redBar.action.uri}>
								{this.state.redBar.action.label}
							</a>
						</p>
						<div
							className="notification-close"
							role="button"
							tabIndex={0}
							onClick={this.closeNotification}
						/>
					</div>
				}
				<div className={cx('login-bar', { notificationOpen: Boolean(Object.keys(this.state.redBar).length) })}>
					<div className="spacer" />
					<a href="https://today.flatland.church">
						Today
					</a>
					<a
						href="http://flatland.churchcenter.com"
						target="_blank"
						rel="noopener noreferrer"
					>
						My Account
					</a>
				</div>
				<Header
					logoUseLink
					navUseLink
					navItems={[
						{ uri: '/watch', label: 'Messages' },
						{ uri: '/about', label: 'About' },
						{ uri: '/visit', label: 'Visit' },
						{ uri: '/connect', label: 'Connect' },
						{ uri: '/give', label: 'Give' },
					]}
					rightButtons={[
						(
							<div
								className="search-button"
								tabIndex={0}
								key="search"
								onClick={this.toggleSearch}
							>
								<Icon>Search</Icon>
							</div>
						),
						(
							<div
								className="header-nav-item"
								onClick={this.toggleMenuState}
								onKeyDown={handleKeyDown(true, this.toggleMenuState)}
								tabIndex={0}
								key="hamburger-menu"
								role="button"
								aria-label="menu toggle"
							>
								<div>Menu</div>
								<div className={cx('hamburger', { open: this.state.menuOpen })}>
									<span />
									<span />
									<span />
								</div>
							</div>
						)
					]}
				/>
				{
					this.state.menuOpen &&
					<Menu
						onClose={this.toggleMenuState}
					/>
				}
				{
					this.state.searchOpen &&
					<Search
						results={this.state.searchResults}
						value={this.state.searchValue}
						onSearch={this.handleSearch}
						onClose={this.toggleSearch}
						onSelect={this.handleNavigation}
					/>
				}
			</React.Fragment>
		)
	}
}
