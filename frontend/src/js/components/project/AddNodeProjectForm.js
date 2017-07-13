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
	const requiredFields = ['title', 'desc', 'prevNodes'];

	requiredFields.forEach(field => {
		if(!values[field]) {
			errors[field] = 'Required'
		}
	});
	return errors;
}

class AddNodeProjectForm extends React.Component {

	constructor(props) {
		super(props);
		this.closeNodeProjectModal = this.closeNodeProjectModal.bind(this);
	}	

	closeNodeProjectModal() {
		this.props.deselectNodeProjectModal();
	}

	// componentDidUpdate() {

	// 	const { isUpdated, selectedProject_id } = this.props;

	// 	if(isUpdated) {
	// 		// this.props.cleanUp();
	// 		// this.props.dispatch(push('/dashboard'));
	// 		//this.props.dispatch(push('/dashboard/' + selectedProject_id + '/' + true));
	// 	}
	// }

	submitForm(val){
		const { selectedProject_id, user } = this.props;
		this.props.addNewNode(val.title, val.desc, user, 0, val.prevNodes,
								selectedProject_id);
	}

	render() {
		const { handleSubmit, projectError, nodes } = this.props;		

		return(
			<div>
				<h3>New Idea</h3>
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
									return <MenuItem key= { node._id } value={ node._id }
											primaryText={ node.title } />			        				
							})
						}
					</SelectFormField>
				</div>							
				<div>
					<RaisedButton class="RaisedButton"
								label="Add New Idea"
								primary type="submit"
								style={{ width: '100%' }}/>
				</div>
				</form>
				<div>
					<button class="btn-default" style={{ width: '100%', marginTop: '10px' }}
					onClick={this.closeNodeProjectModal}>CANCEL</button>
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
export default reduxForm({
	form: 'AddNodeProjectForm',
	validate
})(AddNodeProjectForm)