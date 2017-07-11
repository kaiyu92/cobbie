import React from 'react';
import { Field } from 'redux-form';
import { DatePicker, TimePicker } from 'redux-form-material-ui';

export const DatePickerField =({ name, ...rest}) => {
	return (
		<Field
			component={ DatePicker }
			name={name}
			autoComplete="off"
			fullWidth={true}
			format={null}
			{...rest} />
	);
}


export const TimePickerField =({ name, ...rest}) => {
	return (
		<Field
			component={ TimePicker }
			name={name}
			autoComplete="off"
			fullWidth={true}
			format={null}
			{...rest} />
	);
}