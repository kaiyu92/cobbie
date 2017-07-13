import React from 'react';
import { bindActionCreators } from 'redux';
import SortableTree from 'react-sortable-tree';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

import ProjectList from '../components/project/ProjectList';
import UserProjectList from '../components/project/UserProjectList';
import NodeProjectList from '../components/project/NodeProjectList';

import AddProjectForm from '../components/project/AddIndex';
import AddUserProjectForm from '../components/project/AddUserIndex';
import AddNodeProjectForm from '../components/project/AddNodeIndex';

import { fetchNodeProject, 
	selectUserProject, 
	resetUpdateState,
	selectProjectModal,
	deselectProjectModal,
	selectUserProjectModal,
	deselectUserProjectModal,
	selectNodeProjectModal,
	deselectNodeProjectModal  } from '../actions/projectActions';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.openProjectModal = this.openProjectModal.bind(this);
        this.closeProjectModal = this.closeProjectModal.bind(this);

        this.openUserProjectModal = this.openUserProjectModal.bind(this);
        this.closeUserProjectModal = this.closeUserProjectModal.bind(this);

        this.openNodeProjectModal = this.openNodeProjectModal.bind(this);
        this.closeNodeProjectModal = this.closeNodeProjectModal.bind(this);

        this.handleRefresh = this.handleRefresh.bind(this);
        // this.state = {
        //     treeData: [{ title: 'Orbital', children: [ { title: 'Website', children: [{ title: 'React'}], expanded: true}, 
        //     										{ title: 'Mobile App', children: [
        //     										{ title: 'Android'}, { title: 'iOS'}
        //     										], expanded: true
        //     										}], expanded: true  
        //     		}]
        // }; 
    }
 	
 	componentDidUpdate() {
 		// console.log(this.props);
		const { isProjectSelected, projects, selectedProject_id } = this.props;
		const { project_id } = this.props.match.params;

		if(isProjectSelected) {
			this.props.selectUserProject(projects, selectedProject_id);
			this.props.fetchNodeProject(selectedProject_id);			
			this.props.cleanUp();
		}
	}

	openProjectModal() {
		this.props.selectProjectModal();
	}

	closeProjectModal(){
		this.props.deselectProjectModal();
	}

	openUserProjectModal() {
		this.props.selectUserProjectModal();
	}

	closeUserProjectModal() {
		this.props.deselectUserProjectModal();
	}

	openNodeProjectModal() {
		this.props.selectNodeProjectModal();
	}

	closeNodeProjectModal() {
		this.props.deselectNodeProjectModal();
	}

	handleRefresh(e) {
		e.preventDefault();
		const { projects, selectedProject_id } = this.props;
		this.props.selectUserProject(projects, selectedProject_id);
		this.props.fetchNodeProject(selectedProject_id);		
	}

    render() {

		const { projects, project_modal, user_modal, node_modal } = this.props;
		const { project_id } = this.props.match.params;

		const customStyles = {
			  overlay : {
			    position          : 'fixed',
			    top               : 0,
			    left              : 0,
			    right             : 0,
			    bottom            : 0,
			    backgroundColor   : 'rgba(0, 0, 0, 0.5)'
			  },
			  content : {
			    top                   : '50%',
			    left                  : '50%',
			    right                 : 'auto',
			    bottom                : 'auto',
			    marginRight           : '-50%',
			    transform             : 'translate(-50%, -50%)'
			  }
		};

		const addBtnStyle = {
			marginTop: '-17px'
		}
		const navSideBarStyle = {
			marginRight: '-21px',
			marginBottom: '20px',
			marginLeft: '-5px',
			paddingRight: '20px',
			paddingLeft: '20px',
	
		}
		const sideBarStyle = {
			position: 'fixed',
			top: '51px',
			bottom: '0',
			left: '0',
			zIndex: '1000',
			display: 'block',
			padding: '20px',
			overflowX: 'hidden',
			overflowY: 'auto',
			backgroundColor: '#FDFEFE',
			borderRight: '1px solid #eee'
		}
        				// <h1 class="page-header">Orbital</h1>
			         //    <div style={{ height: 400 }}>
			         //        <SortableTree
			         //            treeData={this.state.treeData}
			         //            onChange={treeData => this.setState({ treeData })}
			         //        />
			         //    </div>	
			         // project.users.map(function(user){
						      //     			return <li > 
						      //     				//(user);
						      //     					{user}
						      //     				</li>;					        				
					       //  			})	
        return (
        	<div class="container-fluid">
        		<div class="row">
			        <div class="col-xs-3 col-sm-2 sidebar" style={sideBarStyle}>
			        <div>
			        	<a href="#" onClick={this.handleRefresh}>
			        		<span class ="glyphicon glyphicon-refresh"></span>
			        	</a>
			        </div>
			         <ProjectList />
			         <div>
			         	<button onClick={this.openProjectModal} class="btn icon-btn btn-default" style={addBtnStyle}>
			         	<span class="glyphicon btn-glyphicon glyphicon-plus img-circle text-muted"></span>
			         	Add</button>
			         	<Modal
			         		isOpen={project_modal}
			         		onRequestClose={this.closeProjectModal}
			         		style={customStyles}
			         		contentLabel="Project Modal">
			         		<AddProjectForm />
			         	</Modal>

			         </div>
			         {
			         	project_id !== undefined ?			         	
		        		<div>
		        			<UserProjectList/>
		        			<div>
					         	<button onClick={this.openUserProjectModal} class="btn icon-btn btn-default" style={addBtnStyle}>
					         	<span class="glyphicon btn-glyphicon glyphicon-plus img-circle text-muted"></span>
					         	Add</button>
					         	<Modal
					         		isOpen={user_modal}
					         		onRequestClose={this.closeUserProjectModal}
					         		style={customStyles}
					         		contentLabel="User Modal">
					         		<AddUserProjectForm />
					         	</Modal>		        			
		        			</div>
			            </div> :
			            <div></div>
			         }
			         {
			            project_id !== undefined ?
			            <div>
							<NodeProjectList/>
							<div>
					         	<button onClick={this.openNodeProjectModal} class="btn icon-btn btn-default" style={addBtnStyle}>
					         	<span class="glyphicon btn-glyphicon glyphicon-plus img-circle text-muted"></span>
					         	Add</button>
					         	<Modal
					         		isOpen={node_modal}
					         		onRequestClose={this.closeNodeProjectModal}
					         		style={customStyles}
					         		contentLabel="Node Modal">
					         		<AddNodeProjectForm />
					         	</Modal>							
							</div>	            	
			            </div> :
			            <div></div>			         	
			         }
			        </div>
        			<div class="col-xs-9 col-sm-10 col-sm-offset-2 col-xs-offset-3">

		            </div>
	            </div>
            </div>
        );
    }
}

//redux
const mapStateToProps = (state) => {
	return {
		projects: state.project.projects,
		projectError: state.project.error,
		username: state.user.userObject.user,
		isProjectSelected: state.project.isProjectSelected,
		selectedProject_id: state.project.selectedProject_id,
		project_modal: state.project.project_modal,
		user_modal: state.project.user_modal,
		node_modal: state.project.node_modal
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators({ }, dispatch),
		fetchNodeProject: (project_id) => {
			dispatch(fetchNodeProject(project_id));
		},
		selectUserProject: (projects, project_id) => {
			dispatch(selectUserProject(projects, project_id));
		},
		cleanUp: () => dispatch(resetUpdateState()),
		selectProjectModal: () => dispatch(selectProjectModal()),
		deselectProjectModal: () => dispatch(deselectProjectModal()),
		selectUserProjectModal: () => dispatch(selectUserProjectModal()),
		deselectUserProjectModal: () => dispatch(deselectUserProjectModal()),
		selectNodeProjectModal: () => dispatch(selectNodeProjectModal()),
		deselectNodeProjectModal: () => dispatch(deselectNodeProjectModal())
	};
};


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);