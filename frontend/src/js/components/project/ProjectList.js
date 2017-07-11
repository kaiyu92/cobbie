import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchingUserProject } from '../../actions/projectActions';

class ProjectList extends React.Component {
    constructor(props) {
        super(props);

        //Fetch all the projects that is associated to this user
    	const { username } = this.props;
    	this.props.fetchingUserProject(username);
    }

 
    render() {
    	const { projects } = this.props;
		const navSideBarStyle = {
			marginRight: '-21px',
			marginBottom: '20px',
			marginLeft: '-5px',
			paddingRight: '20px',
			paddingLeft: '20px',
	
		}	
        return (
        		<div>
			        <h3>Projects</h3>
			        <ul style={navSideBarStyle}>
			        {
			          	projects.map(function(project){
			          			return <li key={ project._id }> 
			          						<Link to={'/dashboard/' + project._id}>
			          							{ project.title }
			          						</Link>
			          					</li>;
			          	})
			        }
			        <li><Link to='/addproject'><strong>Add Project</strong></Link></li>
			        </ul>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);