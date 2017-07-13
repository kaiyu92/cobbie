import React from 'react';
import { connect } from 'react-redux';
import { attemptLogin } from '../../actions/authActions';
import LoginForm from './LoginForm'

//redux
const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.user.isAuthenticated,
		isLoggedIn: state.user.isLoggedIn,
		loginError: state.user.error,
		// identifier: state.user.userObject.user,
		// password: state.user.userObject.password,
	};
};

const mapDispatchToProps = (dispatch) => ({
	attemptLogin(identifier, password) {
		dispatch(attemptLogin(identifier, password));
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);