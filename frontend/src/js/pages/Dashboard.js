import React from "react";
import SortableTree from 'react-sortable-tree';
import { connect } from 'react-redux';
import { fetchingUserProject } from '../actions/projectActions';

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
    	const { username } = this.props;
    	this.props.fetchingUserProject(username);
    }

 
    render() {
    	const { projects } = this.props;

    	const containerStyle = {
			 padding: '80px 15px',
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
        return (
        	<div class="container-fluid">
        		<div class="row">
			        <div class="col-xs-3 col-sm-2 sidebar" style={sideBarStyle}>
			          <h3>Projects</h3>
			          <ul style={navSideBarStyle}>
			          	{
			          		projects.map(function(project){
			          			return <li key={ project._id }> { project.title }</li>;
			          		})
			          	}
			          </ul>
			          <h3>Team Members</h3>
			          <ul style={navSideBarStyle}>
			            <li>Kai Yu</li>
			            <li>Kaiser</li>
			          </ul>
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
		username: state.user.userObject.user
	};
};

const mapDispatchToProps = (dispatch) => ({
	fetchingUserProject(username) {
		dispatch(fetchingUserProject(username));
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);