import React from 'react';
import cx from 'classnames';
import {
  Button,
} from '@flatland/chokhmah';
import { Link } from 'react-router-dom';

import './Progress.css';

export default (props) => (
  <div
    className={cx('progress-row', {
      complete: props.complete,
      active: props.active,
    })}
  >
    <div className="progress-circle" />
    <div className="progress-section">
      <h3>{props.title}</h3>
      <p>{props.content}</p>
      {
        props.internalUrl && props.label &&
        <Link to={props.internalUrl}>
          <Button context={props.active ? 'primary' : ''}>{props.label}</Button>
        </Link>
      }
      {
        props.externalUrl && props.label &&
        <a href={props.externalUrl}>
          <Button context={props.active ? 'primary' : ''}>{props.label}</Button>
        </a>
      }
    </div>
  </div>
);
