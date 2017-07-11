import React from 'react';
import SortableTree from 'react-sortable-tree';
import { connect } from 'react-redux';
import ProjectList from '../components/project/ProjectList'
import { fetchNodeProject } from '../actions/projectActions';

const users =[];

class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        // this.state = {
        //     treeData: [{ title: 'Orbital', children: [ { title: 'Website', children: [{ title: 'React'}], expanded: true}, 
        //     										{ title: 'Mobile App', children: [
        //     										{ title: 'Android'}, { title: 'iOS'}
        //     										], expanded: true
        //     										}], expanded: true  
        //     		}]
        // }; 
    }
 
    render() {
		
		const { projects } = this.props;
		const { project_id } = this.props.match.params;
		const { nodes } = this.props;

		//When user select one of the projects
		if(project_id !== undefined)
		{
	    	for(let i = 0; i < projects.length; i++)
	    	{
	    		if(projects[i]._id === project_id)
	    		{
	    			//Get all the user that is working on this project
	    			Object.assign(users, projects[i].users);
	    			break;
	    		}
	    	}

	    	//Get all the nodes that is in this project
	    	this.props.fetchNodeProject(project_id);			
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
						      //     				console.log(user);
						      //     					{user}
						      //     				</li>;					        				
					       //  			})	
        return (
        	<div class="container-fluid">
        		<div class="row">
			        <div class="col-xs-3 col-sm-2 sidebar" style={sideBarStyle}>
			         <ProjectList />
			         {
			         	project_id !== undefined ?			         	
		        		<div>
					        <h3>Team</h3>
					        <ul style={navSideBarStyle}>
					        {
						         users.map(function(user){
									          	return <li key={ user }> 
									          			{user}
									          			</li>;					        				
								        		})	
					        }  	
					        </ul>
			            </div> :
			            <div></div>
			         }
			         {
			            nodes.length > 0 ?
			            <div>
			            	<h3>Nodes</h3>
					        <ul style={navSideBarStyle}>
					        {
						         nodes.map(function(node){
									          	return <li key={ node._id }> 
									          			{node.title}
									          			</li>;					        				
								        		})	
					        }  	
					        </ul>			            	
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
		nodes: state.project.nodes
	};
};

const mapDispatchToProps = (dispatch) => ({
	fetchNodeProject(project_id) {
		dispatch(fetchNodeProject(project_id));
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);