import React from 'react';
import {
  TextField,
  Button,
  Radio,
} from '@flatland/chokhmah';

import api from '../../utils/api';

import './DynamicForm.css';

export default class DynamicForm extends React.Component {
  FIELDS = {
    text: ({ label, name }) => (
      <TextField
        label={label}
        onChange={this.handleChange(name)}
        value={this.state.data[name]}
      />
    ),
    email: ({ label, name }) => (
      <TextField
        label={label}
        type="email"
        onChange={this.handleChange(name)}
        value={this.state.data[name]}
      />
    ),
    radio: ({ label, name, options }) => (
      <Radio
        group
        groupHeader={label}
        name={name}
        inputs={options.map((option) => ({
          id: option.value,
          value: option.value,
          label: option.label,
        }))}
        onChange={this.handleRadioChange(name)}
        selected={this.state.data[name]}
      />
    ),
  };

  constructor(props) {
    super(props);
    this.state = {
      actionLabel: '',
      fields: [],
      data: {},
      submitted: false,
      sending: false,
    };
  }

  componentDidMount() {
    api.get(`/forms/${this.props.formId}`)
      .then(({ data: { attributes } }) => {
        this.setState({
          actionLabel: attributes.actionLabel,
          fields: attributes.fields,
        });
      });
  }

  handleChange = (field) => (value) => {
    this.setState((prevState) => ({
      data: {
        ...prevState.data,
        [field]: value,
      },
    }));
  };

  handleRadioChange = (field) => ({ target }) => {
    this.handleChange(field)(target.value);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.state.sending) {
      this.setState({ sending: true });
      api.post(`/forms/${this.props.formId}`, this.state.data)
        .then(() => {
          this.setState({
            sending: false,
            submitted: true,
          });
        });
    }
  };

  render() {
    return (
      <div className="dynamic-form">
        {
          this.state.submitted ?
          <h5>Thanks! We'll be in contact soon.</h5> :
          <form onSubmit={this.handleSubmit}>
            {
              this.state.fields.map((field) => (
                <React.Fragment key={`form-${field.name}`}>
                  {this.FIELDS[field.type](field)}
                </React.Fragment>
              ))
            }
            <Button
              context="primary"
              disabled={this.state.sending}
            >
              {
                this.state.sending ?
                  'Sending...' :
                  this.state.actionLabel
              }
            </Button>
          </form>
        }
      </div>
    );
  }
}
