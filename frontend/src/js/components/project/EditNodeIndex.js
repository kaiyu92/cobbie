import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { editNode, deselectEditNodeModal } from '../../actions/projectActions';
import EditNodeProjectForm from './EditNodeProjectForm';

//redux
const mapStateToProps = (state) => {
	return {
		user: state.user.userObject.user,
		projectError: state.project.error,
		isUpdated: state.project.isUpdated,
		selectedNode: state.project.selectedNode,
		nodes: state.project.nodes,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators({ }, dispatch),
		editNode: (node, user) => {
			dispatch(editNode(node, user));
		},
		deselectEditNodeModal: () => dispatch(deselectEditNodeModal())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(EditNodeProjectForm)