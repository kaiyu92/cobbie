import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { push } from 'react-router-redux';
import { fetchingUserProject, selectState } from '../../actions/projectActions';

class ProjectList extends React.Component {
    constructor(props) {
        super(props);

        //Fetch all the projects that is associated to this user
    	const { username } = this.props;
    	this.props.fetchingUserProject(username);
    	this.navigateProgramatically = this.navigateProgramatically.bind(this);
    }

	navigateProgramatically(e) {
		e.preventDefault();
		const targetLink = e.target.getAttribute("href");

		this.props.selectState({ project_id: targetLink.substring(11), 
									project_title: e.target.text });

		this.props.transitNext(targetLink);
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
		const self = this;	
        return (
        		<div>
			        <h3>Projects</h3>
			        <ul class="list-group">
			        {
			          	projects.map(function(project){
			          			return <li key={ project._id } class="list-group-item"> 
			          						<Link to={'/dashboard/' + project._id}
			          							onClick={self.navigateProgramatically}
			          							replace>
			          							{ project.title }
			          						</Link>
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
		projects: state.project.projects,
		projectError: state.project.error,
		username: state.user.userObject.user
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators({ }, dispatch),
		fetchingUserProject: (username) => {
			dispatch(fetchingUserProject(username));
		},
		selectState: (project) => dispatch(selectState(project)),
		transitNext: (url) => dispatch(push(url))
	};
};


export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);