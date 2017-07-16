import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addUserProject, deselectUserProjectModal, resetUpdateState } from '../../actions/projectActions';
import AddUserProjectForm from './AddUserProjectForm';

//redux
const mapStateToProps = (state) => {
	return {
		user: state.user.userObject.user,
		projectError: state.project.error,
		isUpdated: state.project.isUpdated,
		selectedProject_id: state.project.selectedProject_id
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators({ }, dispatch),
		addUserProject: (project_id, targetUser, user) => {
			dispatch(addUserProject(project_id, targetUser, user));
		},
		cleanUp: () => dispatch(resetUpdateState()),
		deselectUserProjectModal: () => dispatch(deselectUserProjectModal())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AddUserProjectForm)