import React from 'react';
import { Link } from '@flatland/chokhmah';

import './Footer.css';

export default () => (
  <footer>
    <div className="footer-container">
      <div className="footer-column">
        <p>
          4801 N 144th Street, Omaha, NE 68116&nbsp;
          <span className="footer-mobile-hide">|</span>&nbsp;
          <span className="footer-mobile-break">
            <a href="tel:+14024929111">(402) 492-9111</a>
          </span>
        </p>
        <p>
          &copy; {new Date().getFullYear()} Flatland Group. All Rights Reserved. &nbsp;
          <span className="footer-mobile-break">
            <Link data={{ internalUrl: '/privacy', label: 'Privacy' }} /> | <Link data={{ internalUrl: '/terms', label: 'Terms' }} />
          </span>
        </p>
      </div>
      <div className="spacer" />
      <div className="footer-column">
        <ul>
          <li><Link data={{ internalUrl: '/watch', label: 'Watch' }} /></li>
          <li><Link data={{ internalUrl: '/visit', label: 'Visit' }} /></li>
          <li><Link data={{ internalUrl: '/enjoy', label: 'Enjoy' }} /></li>
          <li><Link data={{ internalUrl: '/move', label: 'Move' }} /></li>
          <li><Link data={{ internalUrl: '/give', label: 'Give' }} /></li>
          <li><Link data={{ internalUrl: '/blog', label: 'Blog' }} /></li>
        </ul>
        <ul>
          <li>
            <a href="https://www.facebook.com/flatlandchurchomaha" className="social-link">
              <i className="fa fa-facebook-official" />
              Facebook
            </a>
          </li>
          <li>
            <a href="https://twitter.com/FlatlandChurch" className="social-link">
              <i className="fa fa-twitter" />
              Twitter
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/flatlandchurch/" className="social-link">
              <i className="fa fa-instagram" />
              Instagram
            </a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
);