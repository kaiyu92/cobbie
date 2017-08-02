import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import RaisedButton from 'material-ui/RaisedButton';
import { TextFormField } from '../field/TextFieldComponents';
import { SelectFormField } from '../field/MenuComponents';
import MenuItem from 'material-ui/MenuItem';

const validate = values => {
	const errors = {};
	const requiredFields = ['title', 'desc', 'prevNodes'];

	requiredFields.forEach(field => {
		if(!values[field]) {
			errors[field] = 'Required'
		}
	});
	return errors;
}

class EditNodeProjectForm extends React.Component {

	constructor(props) {
		super(props);
		this.closeEditNodeModal = this.closeEditNodeModal.bind(this);
	}	

	closeEditNodeModal() {
		this.props.deselectEditNodeModal();
	}

	submitForm(val){
		const { selectedNode, user } = this.props;
		this.props.editNode({ _id: selectedNode._id, title: val.title,
								desc: val.desc,
								previousNode: val.prevNodes}, user);
	}

	render() {
		const { handleSubmit, projectError, nodes, selectedNode } = this.props;		
		
		return(
			<div>
				<h3>Change Idea</h3>
				<form onSubmit={ handleSubmit((values) => {
					this.submitForm(values)
				})}>
				<div>
					<TextFormField 
						name="title"
						floatingLabelText="Title"/>
				</div>
				<div>
					<TextFormField 
						name="desc"
						floatingLabelText="Description"
						multiLine={true}/>
				</div>	
				<div>
					<SelectFormField
						name="prevNodes"
						floatingLabelText="Which Inspiration?">
						{
							nodes.map(function(node){
									if(node._id !== selectedNode._id)
										return <MenuItem key= { node._id } value={ node._id }
												primaryText={ node.title } />			        				
							})
						}
					</SelectFormField>
				</div>							
				<div>
					<RaisedButton class="RaisedButton"
								label="Edit Idea"
								primary type="submit"
								style={{ width: '100%' }}/>
				</div>
				</form>
				<div>
					<button class="btn-default" style={{ width: '100%', marginTop: '10px' }}
					onClick={this.closeEditNodeModal}>CANCEL</button>
				</div>
				{
					projectError.length > 0 &&
						<h4 style={{ color: '#F86E60' }}> { projectError } </h4>

				}
			</div>
		);
	}
}

// Decorate with redux-form
EditNodeProjectForm = reduxForm({
	form: 'EditNodeProjectForm',
	validate
})(EditNodeProjectForm)

EditNodeProjectForm = connect(
	state => ({
		initialValues: {
			title: state.project.selectedNode.title,
			desc: state.project.selectedNode.desc,
			prevNodes: state.project.selectedNode.previousNode
		}
	})
)(EditNodeProjectForm)

export default EditNodeProjectForm