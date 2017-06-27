import React from 'react';
import LoginForm from '../components/login/LoginForm';

export default class Login extends React.Component {
	render() {
		return (
			<div>
				<div class="col-md-4 col-md-offset-4">
					<LoginForm />
				</div>
			</div>
		);
	}
}