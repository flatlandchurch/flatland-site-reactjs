import React from 'react';
import {
  TextField,
  Button,
  Radio,
} from '@flatland/chokhmah';
import Select from 'react-select';
import cx from 'classnames';

import api from '../../utils/api';

import './DynamicForm.css';

export default class DynamicForm extends React.Component {
  FIELDS = {
    text: ({ label, name, helpText, required }) => (
      <TextField
        label={label}
        onChange={this.handleChange(name)}
        value={this.state.data[name]}
        helpText={helpText}
        required={required}
      />
    ),
    email: ({ label, name, helpText, required }) => (
      <TextField
        label={label}
        type="email"
        onChange={this.handleChange(name)}
        value={this.state.data[name]}
        helpText={helpText}
        required={required}
      />
    ),
    textarea: ({ label, name, helpText, required }) => (
      <TextField
        label={label}
        textarea
        onChange={this.handleChange(name)}
        value={this.state.data[name]}
        helpText={helpText}
        required={required}
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
    select: ({ label, name, options, required }) => (
      <div className="form-field">
        <label
          className={cx({ required })}
        >
          {label}
        </label>
        <Select
          name={name}
          options={options}
          value={this.state.data[name]}
          onChange={this.handleChange(name)}
        />
      </div>
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
      const data = this.state.data;

      // react-select saves its values with value and label
      // so in the case where we have selects present
      // we want to pull out the value to send in the request
      const selectFields = this.state.fields.find((f) => f.type === 'select');
      if (selectFields) {
				if (Array.isArray(selectFields)) {
					selectFields.forEach((field) => {
						data[field.name] = data[field.name].value;
					});
				} else {
					data[selectFields.name] = data[selectFields.name].value;
				}
      }

      api.post(`forms/${this.props.formId}`, data)
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
