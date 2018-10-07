import React from 'react';
import { Header, Menu, Icon, Search } from '@flatland/chokhmah';
import cx from 'classnames';

import handleKeyDown from '../../utils/handleKeyDown';

import api from '../../utils/api';
import './Header.css';

export default class AppHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
      searchOpen: false,
      searchValue: '',
      searchResults: [],
    };
  }

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
        <div className="login-bar">
          <div className="spacer" />
          {/*<Link to="/me/notes">My Notes</Link>*/}
          <a href="https://flatlandchurch.infellowship.com/UserLogin">My Account</a>
        </div>
        <Header
          logoUseLink
          navUseLink
          navItems={[
            { uri: '/watch', label: 'Messages' },
            { uri: '/visit', label: 'Visit' },
            { uri: '/enjoy', label: 'Events' },
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
            menuItems={{
              _: [
                { uri: '/watch', label: 'Messages' },
                { uri: '/visit', label: 'Visit' },
                { uri: '/enjoy', label: 'Events' },
                { uri: '/give', label: 'Give' },
              ],
              about: [
                { uri: '/visit', label: 'Location' },
                { uri: '/visit/values', label: 'Values' },
                { uri: '/visit/beliefs', label: 'Beliefs' },
                { uri: '/visit/leadership', label: 'Leadership' },
                { uri: '/move/classes/next-step', label: 'Next Steps' },
              ],
              connect: [
                { uri: '/visit/kids', label: 'Kids' },
                { uri: '/visit/students', label: 'Students' },
                { uri: '/enjoy', label: 'Events' },
                { uri: '/move/groups', label: 'Life Groups' },
                { uri: '/move/classes', label: 'Core Classes' },
                { uri: '/missions', label: 'Missions' },
              ],
              resources: [
                { uri: '/watch', label: 'Messages' },
                { uri: '/blog', label: 'Blog' },
                { uri: '/move', label: 'Coaching' },
                { uri: '/radio', label: 'Podcast' },
                { uri: '/watch/series', label: 'Series Resources' },
              ],
            }}
            fixed
            onClick={this.toggleMenuState}
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