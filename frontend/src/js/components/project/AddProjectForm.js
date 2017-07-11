import React from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import RaisedButton from 'material-ui/RaisedButton';
import { TextFormField } from '../field/TextFieldComponents';
import { DatePickerField, TimePickerField } from '../field/DateTimeComponents';

const validate = values => {
	const errors = {};
	const requiredFields = ['project_title', 'project_desc', 'deadline_date',
							'deadline_time', 'pri_title', 'pri_desc'];

	requiredFields.forEach(field => {
		if(!values[field]) {
			errors[field] = 'Required'
		}
	});
	return errors;
}

class AddProjectForm extends React.Component {

	componentDidUpdate() {

		const { isUpdated } = this.props;

		if(isUpdated) {
			this.props.cleanUp();
			this.props.dispatch(push('/dashboard'));
		}
	}

	submitForm(val){
		const d_date = new Date(val.deadline_date);
		const d_time = new Date(val.deadline_time);

		const deadline = new Date(d_date.getFullYear(),
								  d_date.getMonth(),
								  d_date.getDate(),
								  d_time.getHours(),
								  d_time.getMinutes(),
								  d_time.getSeconds(),
								  d_time.getMilliseconds());

		this.props.addNewProject(val.project_title, val.project_desc, deadline,
								this.props.user, val.pri_title, val.pri_desc);
	}

	render() {
		const { handleSubmit, projectError } = this.props;

		return(
			<div>
				<h3>New Project</h3>
				<form onSubmit={ handleSubmit((values) => {
					this.submitForm(values)
				})}>
				<div>
					<TextFormField 
						name="project_title"
						floatingLabelText="Project Title"/>
				</div>				
				<div>
					<TextFormField 
						name="project_desc"
						floatingLabelText="Project Description"
						multiLine={true}/>
				</div>
				<div>
					<DatePickerField
						name="deadline_date"
						floatingLabelText="Deadline Date"
						mode="landscape"/>
				</div>
				<div>
					<TimePickerField
						name="deadline_time"
						floatingLabelText="Deadline Time"/>
				</div>
				<hr/>
				<h3>Primary Node</h3>
				<div>
					<TextFormField 
						name="pri_title"
						floatingLabelText="Node Title"/>
				</div>				
				<div>
					<TextFormField 
						name="pri_desc"
						floatingLabelText="Node Description"
						multiLine={true}/>
				</div>				
				<div>
					<RaisedButton class="RaisedButton"
								label="Create New Project"
								primary type="submit"
								style={{ width: '100%' }}/>
				</div>
				</form>
				{
					projectError.length > 0 &&
						<h4 style={{ color: '#F86E60' }}> { projectError } </h4>

				}
			</div>
		);
	}
}

// Decorate with redux-form
export default reduxForm({
	form: 'AddProjectForm',
	validate
})(AddProjectForm)