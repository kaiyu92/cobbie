import React from 'react';
import { Field } from 'redux-form';
import { SelectField } from 'redux-form-material-ui';

export const SelectFormField = ({ name, ...rest }) => {
  return (
      <Field
          component={ SelectField }
          name = { name }
          fullWidth={true}
          {...rest} />
    );
};
