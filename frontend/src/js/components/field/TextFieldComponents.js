import React from 'react';
import { Field } from 'redux-form';
import { TextField } from 'redux-form-material-ui';

export const TextFormField =({ name, ...rest}) => {
	return (
		<Field
			component={ TextField }
			name={name}
			autoComplete="off"
			fullWidth={true}
			type="text"
			{...rest} />
	);
}

export const EmailFormField =({ name, ...rest}) => {
	return (
		<Field
			component={ TextField }
			name={name}
			autoComplete="off"
			fullWidth={true}
			type="email"
			{...rest} />
	);
}

export const PasswordFormField =({ name, ...rest}) => {
	return (
		<Field
			component={ TextField }
			name={name}
			autoComplete="off"
			fullWidth={true}
			type="password"
			{...rest} />
	);
}