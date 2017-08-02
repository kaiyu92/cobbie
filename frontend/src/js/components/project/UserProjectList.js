import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { selectUserProject, resetUpdateState, fetchingUserProject } from '../../actions/projectActions';

class UserProjectList extends React.Component {

    render() {
    	const { project_users } = this.props;
    	
		const navSideBarStyle = {
			marginRight: '-21px',
			marginBottom: '20px',
			marginLeft: '-5px',
			paddingRight: '20px',
			paddingLeft: '20px',
	
		}

        return (
        		<div>
			        <h3>Team</h3>
			        <ul class="list-group">
					{			
						project_users.map(function(user){
									        return <li key={ user } class="list-group-item"> 
									          			{user}
									          			</li>;					        				
						})	
					}
			        </ul>
	            </div>
        );
    }
}

//redux
const mapStateToProps = (state) => {
	return {
		project_users: state.project.project_users,
		isUpdated: state.project.isUpdated,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators({ }, dispatch),
		selectUserProject: (projects, project_id) => {
			dispatch(selectUserProject(projects, project_id));
		},
		cleanUp: () => dispatch(resetUpdateState()),
	};
};


export default connect(mapStateToProps)(UserProjectList);