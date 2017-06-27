import React from 'react';
import TextFieldGroup from '../TextFieldGroup';
import validateInput from './validateInput';

import { connect } from 'react-redux';
import { attemptLogin } from '../../actions/authActions';

class LoginForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			identifier:'',
			password:'',
			errors:{},
			isLoading: false
		};
		this.onSubmit = this.onSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	verifyLoginStatus() {
		const { isLoggedIn, isAuthenticated } = this.props;
		//console.log(isLoggedIn);
		if(isLoggedIn && isAuthenticated)
			this.context.router.history.push('/dashboard');
	}

	isValid() {
		const { errors, isValid } = validateInput(this.state);

		if(!isValid) {
			this.setState({ errors });
		}

		return isValid;
	}

	onSubmit(e) {
		e.preventDefault();
		if(this.isValid()) {
			this.setState({ errors: {}, isLoading: true });
			this.props.attemptLogin(this.state);
			this.verifyLoginStatus();
		}
	}

	onChange(e) {
		this.setState( { [e.target.name]: e.target.value });
	}

	render() {
		const { errors, identifier, password, isLoading } = this.state;

		return (
	      <form onSubmit={this.onSubmit}>
	        <h3>Please sign in</h3>

	        

	        <TextFieldGroup
	          field="identifier"
	          label="Username"
	          value={identifier}
	          error={errors.identifier}
	          onChange={this.onChange}
	        />

	        <TextFieldGroup
	          field="password"
	          label="Password"
	          value={password}
	          error={errors.password}
	          onChange={this.onChange}
	          type="password"
	        />

	        <div className="form-group"><button className="btn btn-primary btn-lg" disabled={isLoading}>Login</button></div>
	      </form>
		);
	}


	// render() {
	// 	return(
	//       <form onSubmit={this.onSubmit}>
	//         <h3>Please sign in</h3>


	//         <div className="form-group"><button className="btn btn-primary btn-lg">Login</button></div>
	//       </form>			
	// 	);
	// }
}

// LoginForm.propTypes = {
// 	attemptLogin: React.PropTypes.func.isRequired
// }

// LoginForm.contextTypes = {
// 	router: React.PropTypes.object.isRequired
// }

//redux
const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.user.isAuthenticated,
		isLoggedIn: state.user.isLoggedIn
	};
};

const mapDispatchToProps = (dispatch) => ({
	attemptLogin(data) {
		dispatch(attemptLogin(data));
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);