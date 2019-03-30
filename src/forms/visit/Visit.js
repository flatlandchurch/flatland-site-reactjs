import React from 'react';
import { TextField, Button, Radio } from '@flatland/chokhmah';
import moment from 'moment';
import { get } from 'lodash';
import qs from 'qs';

import '../Forms.css';

import api from '../../utils/api';

const getSundays = (offset) => {
  const SUNDAY = 0;
  const today = moment().isoWeekday();

  if (today <= SUNDAY) {
    return moment().isoWeekday(SUNDAY);
  } else {
    return moment().add(offset, 'weeks').isoWeekday(SUNDAY);
  }
};

export default class Visit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spouseOpen: false,
      children: {},
      childCount: 0,
      firstName: '',
      lastName: '',
      email: '',
      spouseName: '',
      selectedService: 'this-sunday',
      formSent: false,
      date: getSundays(1).unix(),
    };
  }

  handleChildChange = (field, number) => (value) => {
    this.setState((prevState) => ({
      children: {
        ...prevState.children,
        [number]: {
          ...prevState.children[number],
          [field]: value,
        }
      }
    }));
  };

  handleChildClick = (e) => {
    e.preventDefault();
    this.setState((prevState) => ({
      childCount: prevState.childCount + 1,
    }));
  };

  handleFieldChange = (name) => (value) => {
    this.setState({
      [name]: value,
    });
  };

  handleServiceSelect = ({ target }) => {
    this.setState({ date: target.value, selectedService: target.id });
  };

  handleSpouseClick = (e) => {
    e.preventDefault();
    this.setState({ spouseOpen: true });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const hasChildren = Boolean(Object.keys(this.state.children).length);

    const { location } = qs.parse(window.location.search.replace('?', ''));

    const data = {
      hasChildren,
      firstName: this.state.firstName || '',
      lastName: this.state.lastName || '',
      email: this.state.email || '',
      spouse: this.state.spouseName,
      children: [],
      date: this.state.date,
      spouseCount: this.state.spouseName ? 1 : 0,
      campus: location || 'flatland-144',
    };

    if (hasChildren) {
      data.children = Object.keys(this.state.children)
        .filter((k) => this.state.children[k].name)
        .map((k) => this.state.children[k]);
    }

    api.post('emails/visit', data)
      .then(() => {
        this.setState({ formSent: true });
      });
  };

  render() {
    return (
      <React.Fragment>
        {
          this.state.formSent ?
            <p>We can't wait to see you! Be looking for an email from us with more information about your visit to Flatland Church.</p> :
            <form className="page-form" onSubmit={this.handleSubmit}>
              <TextField
                label="First Name"
                onChange={this.handleFieldChange('firstName')}
                onBlur={this.handleFieldChange('firstName')}
                value={this.state.firstName}
                required
              />
              <TextField
                label="Last Name"
                onChange={this.handleFieldChange('lastName')}
                onBlur={this.handleFieldChange('lastName')}
                value={this.state.lastName}
                required
              />
              <TextField
                label="Email"
                type="email"
                helpText="We take your privacy seriously. No spam. No selling off your email."
                onChange={this.handleFieldChange('email')}
                onBlur={this.handleFieldChange('email')}
                value={this.state.email}
                required
              />
              {
                this.state.spouseOpen ?
                  <TextField
                    label="Spouse Name"
                    onChange={this.handleFieldChange('spouseName')}
                    onBlur={this.handleFieldChange('spouseName')}
                    value={this.state.spouseName}
                  /> :
                  <Button
                    context="black"
                    onClick={this.handleSpouseClick}
                  >
                    + Add Spouse
                  </Button>
              }
              {
                Array(this.state.childCount).fill().map((_, idx) => (
                  <div className="child-input" key={`child-${idx}`}>
                    <TextField
                      label="Child's Name"
                      onChange={this.handleChildChange('name', idx)}
                      onBlur={this.handleChildChange('name', idx)}
                      value={get(this.state, `children.${idx}.name`)}
                    />
                    <TextField
                      label="Birthday (m/d/yyyy)"
                      onChange={this.handleChildChange('birthday', idx)}
                      onBlur={this.handleChildChange('birthday', idx)}
                      value={get(this.state, `children.${idx}.birthday`)}
                    />
                  </div>
                ))
              }
              <Button context="black" onClick={this.handleChildClick}>+ Add Child</Button>
              <Radio
                group
                groupHeader="When can we expect you?"
                name="visit-expect"
                inputs={[
                  {
                    id: 'this-sunday',
                    label: `This Sunday (${getSundays(1).format('MMMM Do')})`,
                    value: getSundays(1).unix(),
                  },
                  {
                    id: 'next-sunday',
                    label: `Next Sunday (${getSundays(2).format('MMMM Do')})`,
                    value: getSundays(2).unix(),
                  },
                  {
                    id: 'next-next-sunday',
                    label: `Following Sunday (${getSundays(3).format('MMMM Do')})`,
                    value: getSundays(3).unix(),
                  },
                ]}
                onChange={this.handleServiceSelect}
                selected={this.state.selectedService}
              />
              <div className="submit-button">
                <Button context="primary" block>Tell us you're coming</Button>
              </div>
            </form>
        }
      </React.Fragment>
    );
  }
}
