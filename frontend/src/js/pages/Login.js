import React from 'react';
import LoginForm from '../components/login/LoginIndex';

export default class Login extends React.Component {
	render() {
		return (
			<div id="login-page">
				<div class="container">
					<div class="col-md-4 col-md-offset-4">
						<LoginForm id="login"/>
					</div>
				</div>
			</div>
		);
	}
}
