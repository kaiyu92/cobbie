import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { attemptRegister, resetSignUp } from '../../actions/user';
import RegisterForm from './RegisterForm'

//redux
const mapStateToProps = (state) => {
	return {
		successMsg: state.user.signupInfo.msg,
		regError: state.user.signupInfo.error,
		isRegistering: state.user.signupInfo.isRegistering
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators({ }, dispatch),
		attemptRegister: (user, password, email, firstName, lastName) => {
			dispatch(attemptRegister(user, password, email, firstName, lastName));
		},
		resetSignUp: () => dispatch(resetSignUp()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);