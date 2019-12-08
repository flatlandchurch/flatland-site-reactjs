import React from 'react';
import { Link } from 'react-router-dom';
import createFocusTrap from 'focus-trap';

import './Menu.css';

export default class Menu extends React.Component {
  componentDidMount() {
    window.addEventListener('keydown', this.closeMenu);
    this.trap = createFocusTrap('#app-menu');
    this.trap.activate();
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeMenu);
    this.trap.deactivate();
  }

  closeMenu = (e) => {
    if (e.key === 'Escape') {
      this.props.onClose();
    }
  };

  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.props.onClose();
    }
  };

  render() {
    const linkProps = {
      onClick: this.props.onClose,
    };

    return (
      <div className="app-menu-wrapper" id="app-menu">
        <nav className="app-menu" onClick={this.closeMenu}>
          <div className="app-menu-section">
            <ul>
              <li><Link to="/" {...linkProps}>Home</Link></li>
              <li><Link to="/watch" {...linkProps}>Watch</Link></li>
              <li><Link to="/about" {...linkProps}>About</Link></li>
              <li><Link to="/connect" {...linkProps}>Connect</Link></li>
              <li><Link to="/give" {...linkProps}>Give</Link></li>
              <li><Link to="/prayer" {...linkProps}>Prayer</Link></li>
            </ul>
          </div>
          <div className="app-menu-section">
            <h3>I'm New</h3>
            <ul>
              <li><Link to="/visit" {...linkProps}>Visit</Link></li>
              <li><Link to="/next" {...linkProps}>Next Steps</Link></li>
              <li><Link to="/visit/students" {...linkProps}>Students</Link></li>
              <li><Link to="/visit/kids" {...linkProps}>Children</Link></li>
              <li><Link to="/baptism" {...linkProps}>Baptism</Link></li>
              <li><Link to="/baby-dedication" {...linkProps}>Baby Dedication</Link></li>
            </ul>
          </div>
          <div className="app-menu-section">
            <h3>Get Involved</h3>
            <ul>
              <li><Link to="/enjoy" {...linkProps}>Events</Link></li>
              <li><Link to="/move" {...linkProps}>Discipleship</Link></li>
              <li><Link to="/move/groups" {...linkProps}>Groups</Link></li>
              <li><Link to="/move/classes" {...linkProps}>Classes</Link></li>
            </ul>
          </div>
          {/* Reenable when these pages are built */}
          {/*<div className="app-menu-section">*/}
            {/*<h3>Do Ministry</h3>*/}
            {/*<ul>*/}
              {/*<li>Volunteer</li>*/}
              {/*<li>Missions</li>*/}
              {/*<li>Homes of Influence</li>*/}
              {/*<li>LEAD Program</li>*/}
            {/*</ul>*/}
          {/*</div>*/}
          <div className="app-menu-section app-menu-slug">
            <strong><a href="/the-move" {...linkProps}>The Move</a></strong>
          </div>
          <div className="app-menu-section">
            <h3>Go Deeper</h3>
            <ul>
              <li><Link to="/blog" {...linkProps}>Blog</Link></li>
              <li><Link to="/move" {...linkProps}>Life Coaching</Link></li>
              <li><Link to="/watch/series" {...linkProps}>Series Resources</Link></li>
            </ul>
          </div>
          <div className="app-menu-section">
            <h3>About Us</h3>
            <ul>
              <li><Link to="/about" {...linkProps}>About</Link></li>
              <li><Link to="/visit/leadership" {...linkProps}>Leadership</Link></li>
              <li><Link to="/visit/beliefs" {...linkProps}>Beliefs</Link></li>
              <li><Link to="/visit/values" {...linkProps}>Core Values</Link></li>
            </ul>
          </div>
          <div className="app-menu-section">
            <ul>
              <li className="app-menu-version">Version {process.env.REACT_APP_VERSION}</li>
            </ul>
          </div>
        </nav>
        <div
          className="app-menu-exit-btn"
          role="button"
          tabIndex={0}
          onClick={this.props.onClose}
          onKeyDown={this.handleKeyDown}
        >
          <span />
          <span />
        </div>
      </div>
    );
  }
}
