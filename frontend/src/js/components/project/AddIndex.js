import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addNewProject, deselectProjectModal, resetUpdateState } from '../../actions/projectActions';
import AddProjectForm from './AddProjectForm';

//redux
const mapStateToProps = (state) => {
	return {
		user: state.user.userObject.user,
		projectError: state.project.error,
		isUpdated: state.project.isUpdated
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators({ }, dispatch),
		addNewProject: (project_title, project_desc, deadline, 
			user, pri_title, pri_desc) => {
			dispatch(addNewProject(project_title, project_desc, deadline, user,
									pri_title, pri_desc));
		},
		cleanUp: () => dispatch(resetUpdateState()),
		deselectProjectModal: () => dispatch(deselectProjectModal())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AddProjectForm)