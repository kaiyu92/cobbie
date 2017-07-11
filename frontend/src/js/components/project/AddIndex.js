import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addNewProject, resetUpdateState } from '../../actions/projectActions';
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
		cleanUp: () => dispatch(resetUpdateState())
	};
};

// const mapDispatchToProps = (dispatch) => ({
// 	addNewProject(project_title, project_desc, deadline, user,
// 								pri_title, pri_desc) {
// 		dispatch(addNewProject(project_title, project_desc, deadline, user,
// 								pri_title, pri_desc));
// 	}
// });

export default connect(mapStateToProps, mapDispatchToProps)(AddProjectForm)