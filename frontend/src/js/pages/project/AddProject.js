import React from 'react';
import AddProjectForm from '../../components/project/AddIndex';

export default class AddProject extends React.Component {
	render() {
		return (
			<div>
				<div class="col-md-4 col-md-offset-4">
					<AddProjectForm />
				</div>
			</div>
		);
	}
}