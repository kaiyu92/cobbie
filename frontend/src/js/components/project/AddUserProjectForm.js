import React from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import RaisedButton from 'material-ui/RaisedButton';
import { TextFormField } from '../field/TextFieldComponents';

const validate = values => {
	const errors = {};
	const requiredFields = ['username'];

	requiredFields.forEach(field => {
		if(!values[field]) {
			errors[field] = 'Required'
		}
	});
	return errors;
}

class AddUserProjectForm extends React.Component {

	constructor(props) {
		super(props);
		this.closeUserProjectModal = this.closeUserProjectModal.bind(this);
	}	

	closeUserProjectModal() {
		this.props.deselectUserProjectModal();
	}

	// componentDidUpdate() {

	// 	const { isUpdated, selectedProject_id } = this.props;

	// 	if(isUpdated) {
	// 		// this.props.cleanUp();
	// 		// this.props.dispatch(push('/dashboard'));
	// 		//this.props.dispatch(push('/dashboard/' + selectedProject_id + '/' + true));
	// 	}
	// }

	submitForm(val){
		const { selectedProject_id, user } = this.props;
		this.props.addUserProject(selectedProject_id, val.username, user);
	}

	render() {
		const { handleSubmit, projectError } = this.props;

		return(
			<div>
				<h3>New Contributor</h3>
				<form onSubmit={ handleSubmit((values) => {
					this.submitForm(values)
				})}>
				<div>
					<TextFormField 
						name="username"
						floatingLabelText="Username"/>
				</div>							
				<div>
					<RaisedButton class="RaisedButton"
								label="Add New Member"
								primary type="submit"
								style={{ width: '100%' }}/>
				</div>
				</form>
				<div>
					<button class="btn-default" style={{ width: '100%', marginTop: '10px' }}
					onClick={this.closeUserProjectModal}>CANCEL</button>
				</div>
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
	form: 'AddUserProjectForm',
	validate
})(AddUserProjectForm)