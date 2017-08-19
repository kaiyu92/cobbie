import React from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import RaisedButton from 'material-ui/RaisedButton';
import { TextFormField } from '../field/TextFieldComponents';
import { SelectFormField } from '../field/MenuComponents';
import MenuItem from 'material-ui/MenuItem';


const validate = values => {
	const errors = {};
	const requiredFields = ['comment'];

	requiredFields.forEach(field => {
		if(!values[field]) {
			errors[field] = 'Required'
		}
	});
	return errors;
}

class AddFeedbackForm extends React.Component {

	constructor(props) {
		super(props);
		this.closeFeedbackModal = this.closeFeedbackModal.bind(this);
	}

  closeFeedbackModal() {
		this.props.deselectFeedbackNode();
	}

	submitForm(val){
		const { selectedNode_id, user } = this.props;
		this.props.addNodeFeedback(selectedNode_id, user, val.comment);
	}

	render() {
		const { handleSubmit, feedbackError, nodes } = this.props;

		return(
			<div>
				<h3>New Feedback</h3>
				<form onSubmit={ handleSubmit((values) => {
					this.submitForm(values)
				})}>
				<div>
					<TextFormField
						name="comment"
						floatingLabelText="Write a comment..."
						multiLine={true}/>
				</div>
				<div>
					<RaisedButton class="RaisedButton"
								label="Add New Feedback"
								primary type="submit"
								style={{ width: '100%' }}/>
				</div>
				</form>
				<div>
					<button class="btn-default" style={{ width: '100%', marginTop: '10px' }}
					onClick={this.closeFeedbackModal}>CANCEL</button>
				</div>
				{
					feedbackError.length > 0 &&
						<h4 style={{ color: '#F86E60' }}> { feedbackError } </h4>

				}
			</div>
		);
	}
}

// Decorate with redux-form
export default reduxForm({
	form: 'AddFeedbackForm',
	validate
})(AddFeedbackForm)
