import React from 'react';
import PropTypes from 'prop-types';

import forms from '../../forms';

const Form = (props) => {
  const SelectedForm = forms[props.form.formName] || (() => (<div />));
  return (
    <React.Fragment>
      <h3 id={props.form.title.toLowerCase().replace(/\W/g, '-')}>
        {props.form.title}
      </h3>
      <SelectedForm/>
    </React.Fragment>
  )
};

Form.propTypes = {
  form: PropTypes.object.isRequired,
};

export default Form;
