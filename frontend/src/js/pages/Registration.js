import React from 'react';
import RegisterForm from '../components/Registration/RegisterIndex';

export default class Login extends React.Component {
	render() {
		return (
			<div>
				<div class="col-md-4 col-md-offset-4">
					<RegisterForm />
				</div>
			</div>
		);
	}
}