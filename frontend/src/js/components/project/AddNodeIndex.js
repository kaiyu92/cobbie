import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addNewNode, deselectNodeProjectModal, resetUpdateState } from '../../actions/projectActions';
import AddNodeProjectForm from './AddNodeProjectForm';

//redux
const mapStateToProps = (state) => {
	return {
		user: state.user.userObject.user,
		projectError: state.project.error,
		isUpdated: state.project.isUpdated,
		selectedProject_id: state.project.selectedProject_id,
		nodes: state.project.nodes,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators({ }, dispatch),
		addNewNode: (nodes, node_title, node_desc, user, primNode,
					prevNode, proj_id) => {
			dispatch(addNewNode(nodes, node_title, node_desc, user, primNode,
					prevNode, proj_id));
		},
		cleanUp: () => dispatch(resetUpdateState()),
		deselectNodeProjectModal: () => dispatch(deselectNodeProjectModal())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AddNodeProjectForm)