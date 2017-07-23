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

import NodeDetailPanel from '../components/project/NodeDetailPanel';

import { fetchNodeProject,
	selectUserProject,
	resetUpdateState,
	selectProjectModal,
	deselectProjectModal,
	selectUserProjectModal,
	deselectUserProjectModal,
	selectNodeProjectModal,
	deselectNodeProjectModal,
	selectNodeDetail,
	deselectNodeDetail,
	addNodeLike,
	removeNodeLike  } from '../actions/projectActions';


class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.openProjectModal = this.openProjectModal.bind(this);
        this.closeProjectModal = this.closeProjectModal.bind(this);

        this.openUserProjectModal = this.openUserProjectModal.bind(this);
        this.closeUserProjectModal = this.closeUserProjectModal.bind(this);

        this.openNodeProjectModal = this.openNodeProjectModal.bind(this);
        this.closeNodeProjectModal = this.closeNodeProjectModal.bind(this);

        this.openNodeDetailModal = this.openNodeDetailModal.bind(this);
        this.closeNodeDetailModal = this.closeNodeDetailModal.bind(this);

        this.handleRefresh = this.handleRefresh.bind(this);

        this.updateTreeData = this.updateTreeData.bind(this);
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

	openNodeDetailModal() {
		this.props.selectNodeDetail();
	}

	closeNodeDetailModal() {
		this.props.deselectNodeDetail();
	}

	handleRefresh(e) {
		e.preventDefault();

		const { projects, selectedProject_id } = this.props;

		this.props.selectUserProject(projects, selectedProject_id);
		this.props.fetchNodeProject(selectedProject_id);
	}

	updateTreeData(treeData) {

	}

    render() {

		const { projects, project_modal, selectedProject_title,
			user_modal, node_modal, username, node_detail_modal,
			treeData } = this.props;
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

		const displayNodeInfo = ({ node }) => {
			//console.log(node);
			this.props.selectNodeDetail(node);
		};

		const addNodeLike = ({ node }) => {
			if(node.likes.indexOf(username) !== -1) {
				this.props.removeNodeLike(node._id, username, project_id);
			}
			else {
				this.props.addNodeLike(node._id, username, project_id);
			}
		};

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
					{
						project_id !== undefined ?
						<div>
							<h3 class="page-header">{selectedProject_title}</h3>
						    <div style={{ height: 485 }}>
				                <SortableTree
				                	style={{ height: '100%',
				                			  fontSize: '18px'}}
				                	rowHeight={82}
				                    treeData={treeData}
				                    onChange={this.updateTreeData}
				                    canDrag={false}
				                    generateNodeProps={rowInfo => ({
				                    	buttons: [
				                    	<button style={{ backgroundColor: 'transparent',
				                    					 borderRadius: '10px',}}
				                    			onClick={() => displayNodeInfo(rowInfo)}>
				                    		<span class="glyphicon glyphicon-info-sign"></span>
				                    	</button>,
				                    	<button style={{ backgroundColor: 'transparent',
				                    					 borderRadius: '10px'}}
				                    			onClick={() => addNodeLike(rowInfo)}>
				                    		<span class="glyphicon glyphicon-thumbs-up"
				                    			style={{color: rowInfo.node.likes.indexOf(username) !== -1 ?
				                    								'#73D9FF' : '#515151' }}></span>
				                    	</button>
				                    	]
				                    })}/>
	        				</div>
	        				<div>
	        					<Modal
	        						isOpen={node_detail_modal}
	        						onRequestClose={this.closeNodeDetailModal}
	        						style={customStyles}
	        						contentLabel="Node Detail">
	        						<NodeDetailPanel />
	        					</Modal>
	        				</div>

        				</div> :
        				<div id="empty-dash"></div>
        			}
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
		selectedProject_title: state.project.selectedProject_title,
		project_modal: state.project.project_modal,
		user_modal: state.project.user_modal,
		node_modal: state.project.node_modal,
		node_detail_modal: state.project.node_detail_modal,
		treeData: state.project.treeData,
		nodes: state.project.nodes
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
		addNodeLike: (node_id, username, project_id) => {
			dispatch(addNodeLike(node_id, username, project_id));
		},
		removeNodeLike: (node_id, username, project_id) => {
			dispatch(removeNodeLike(node_id, username, project_id));
		},
		cleanUp: () => dispatch(resetUpdateState()),
		selectProjectModal: () => dispatch(selectProjectModal()),
		deselectProjectModal: () => dispatch(deselectProjectModal()),
		selectUserProjectModal: () => dispatch(selectUserProjectModal()),
		deselectUserProjectModal: () => dispatch(deselectUserProjectModal()),
		selectNodeProjectModal: () => dispatch(selectNodeProjectModal()),
		deselectNodeProjectModal: () => dispatch(deselectNodeProjectModal()),
		selectNodeDetail: (node) => { dispatch(selectNodeDetail(node)) },
		deselectNodeDetail: () => dispatch(deselectNodeDetail())
	};
};


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
