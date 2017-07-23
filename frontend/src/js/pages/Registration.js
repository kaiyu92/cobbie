import React from 'react';
import RegisterForm from '../components/Registration/RegisterIndex';

export default class Registration extends React.Component {
	render() {
		return (
			<div id="register-page">
				<div class="container">
					<div class="col-md-4 col-md-offset-4">
						<RegisterForm />
					</div>
				</div>
			</div>
		);
	}
}