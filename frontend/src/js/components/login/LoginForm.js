import React from 'react';
import { reduxForm } from 'redux-form';
import { push } from 'react-router-redux';
import RaisedButton from 'material-ui/RaisedButton';
import { TextFormField, PasswordFormField} from '../field/TextFieldComponents';


import { attemptLogin } from '../../actions/authActions';


const validate = values => {
	const errors = {};
	const requiredFields = ['identifier', 'password'];

	requiredFields.forEach(field => {
		if(!values[field]) {
			errors[field] = 'Required'
		}
	});
	return errors;
}

class LoginForm extends React.Component {

	componentDidUpdate() {

		const { isLoggedIn, isAuthenticated } = this.props;

		if(isLoggedIn && isAuthenticated)
			this.props.dispatch(push('/dashboard'));
	}

	submitForm(val){
		this.props.attemptLogin(val);
	}

	render() {
		const { handleSubmit, loginError } = this.props;

		return(
			<div>
				<form onSubmit={ handleSubmit((values) => {
					this.submitForm(values)
				})}>
				<div>
					<TextFormField 
						name="identifier"
						floatingLabelText="Username"/>
				</div>
				<div>
					<PasswordFormField
						name="password"
						floatingLabelText="Password"/>
				</div>
				<div>
					<RaisedButton class="RaisedButton"
								label="Login"
								primary type="submit"
								style={{ width: '100%' }}/>
				</div>
				</form>
				{
					loginError.length > 0 &&
						<h4 style={{ color: '#F86E60' }}> { loginError } </h4>

				}
			</div>
		);
	}
}

// Decorate with redux-form
export default reduxForm({
	form: 'LoginForm',
	validate
})(LoginForm)


