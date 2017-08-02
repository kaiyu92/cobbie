import React from 'react';
import { reduxForm } from 'redux-form';
import { push } from 'react-router-redux';
import RaisedButton from 'material-ui/RaisedButton';
import { TextFormField, PasswordFormField, EmailFormField} from '../field/TextFieldComponents';

const validate = values => {
	const errors = {};
	const requiredFields = ['user', 'password', 'email',
							'firstName', 'lastName'];

	requiredFields.forEach(field => {
		if(!values[field]) {
			errors[field] = 'Required'
		}
	});
	return errors;
}

class RegisterForm extends React.Component {

	submitForm(val){
		const { reset } = this.props;
		this.props.attemptRegister(val);
		reset();
	}

	render() {
		const { successMsg, regError, handleSubmit } = this.props;
		return(
			<div>
				{

					successMsg.length > 0 ?
						<div class="panel panel-success">
							<div class ="panel-heading">
								<h4 style={{ color: '#97FF66'}}>
								<span class="glyphicon glyphicon-ok-circle"></span>
								 &nbsp; { successMsg } 							
								</h4>
							</div>
						</div> : regError.length > 0 ?
						<div class="panel panel-warning">
							<div class ="panel-heading">
								<h4 style={{ color: '#CB4335'}}>
								<span class="glyphicon glyphicon-remove-circle"></span>
								&nbsp; { regError}
								</h4>
							</div>
						</div> : <div></div>

				}			
				<h3>Join Cobbie today</h3>
				<form onSubmit={ handleSubmit((values) => {
					this.submitForm(values)
				})}>
				<div>
					<TextFormField
						name="firstName"
						floatingLabelText="First Name"/>
				</div>
				<div>
					<TextFormField
						name="lastName"
						floatingLabelText="Last Name"/>
				</div>
				<div>
					<TextFormField 
						name="user"
						floatingLabelText="Username"/>
				</div>
				<div>
					<PasswordFormField
						name="password"
						floatingLabelText="Password"/>
				</div>
				<div>
					<EmailFormField
						name="email"
						floatingLabelText="Email"/>
				</div>
				<div>
					<RaisedButton class="RaisedButton"
								label="Sign Up"
								primary type="submit"
								style={{ width: '100%' }}/>
				</div>
				</form>

			</div>
		);
	}
}

// Decorate with redux-form
export default reduxForm({
	form: 'RegisterForm',
	validate
})(RegisterForm)


