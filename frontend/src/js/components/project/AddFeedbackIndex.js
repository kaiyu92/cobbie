import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addNodeFeedback, deselectFeedbackNode, resetUpdateState } from '../../actions/projectActions';
import AddFeedbackForm from './AddFeedbackForm';

//redux
const mapStateToProps = (state) => {
	return {
		user: state.user.userObject.user,
		feedbackError: state.project.error,
		selectedNode_id: state.project.selectedNode_id,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators({ }, dispatch),
		addNodeFeedback: (node_id, username, comment) => {
			dispatch(addNodeFeedback(node_id, username, comment));
		},
		cleanUp: () => dispatch(resetUpdateState()),
		deselectFeedbackNode: () => dispatch(deselectFeedbackNode())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AddFeedbackForm)
