import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class NodeProjectList extends React.Component {

    render() {
    	const { nodes } = this.props;
 
		const navSideBarStyle = {
			marginRight: '-21px',
			marginBottom: '20px',
			marginLeft: '-5px',
			paddingRight: '20px',
			paddingLeft: '20px',
	
		}

        return (
        		<div>
			        <h3>Nodes</h3>
					<ul class="list-group">
					{
						nodes.map(function(node){
								return <li key={ node._id } class="list-group-item"> 
									   {node.title}
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
		nodes: state.project.nodes,
		isUpdated: state.project.isUpdated,
	};
};

// const mapDispatchToProps = (dispatch) => {
// 	return {
// 		actions: bindActionCreators({ }, dispatch),
// 		fetchNodeProject: (project_id) => {
// 			dispatch(fetchNodeProject(project_id));
// 		}
// 	};
// };


export default connect(mapStateToProps)(NodeProjectList);