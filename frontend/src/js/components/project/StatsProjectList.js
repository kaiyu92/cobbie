import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { deselectStatsDetail } from '../../actions/projectActions';

//To generate the tree path based on the selected node
function getTreePath(selectedNode, nodes) {
	const map = {};

	for(let i = 0; i < nodes.length; i++) {
		const node = nodes[i];
		map[node._id] = i;
	}

	var displayStr = selectedNode.title;
	var node = selectedNode;
	while(true) {
		
		if(node.primaryNode === 1)
			break;

		node = nodes[map[node.previousNode]];
		const str = node.title + " -> ";
		displayStr = str.concat(displayStr);


	}

	return displayStr;
}

function getHighestLike(nodes) {
	var count = 0;
	for(let i = 0; i < nodes.length; i++) {
		if(count < nodes[i].likes.length)
			count = nodes[i].likes.length;
	}
	return count;
}

class StatsProjectList extends React.Component {

	constructor(props) {
		super(props);

		this.closeStatsProjectModal = this.closeStatsProjectModal.bind(this);
	}

	closeStatsProjectModal() {
		this.props.deselectStatsDetail();
	}

    render() {
    	const { nodes } = this.props;
    	const maxLike = getHighestLike(nodes);
    	const filterNodes = nodes.filter(function(node) {
    		return node.likes.length === maxLike && node.primaryNode !== 1;
    	})

        return (
        		<div>
        			<h3 style={{ textAlign: 'center'}}>Best Idea so far</h3>
        			<div>
        				<ul class="list-group">
        				{
							filterNodes.map(function(node){
								return (<li key={node._id} class="list-group-item"> 
									<h4 class="list-group-item-heading">
										{getTreePath(node, nodes)}
									</h4>
								</li>);
							})						
						} 	
						</ul>
						<h4 style={{ textAlign: 'center'}}><span class="label label-default"> 
						{maxLike} Like is the highest number</span>
						</h4>
					    <button onClick={this.closeStatsProjectModal}
					    	style={{ backgroundColor: 'transparent', width: '100%'}}>
					        <span class="glyphicon glyphicon-remove-circle">CLOSE</span>
					    </button>
        			</div>
	            </div>
        );
    }
}

//redux
const mapStateToProps = (state) => {
	return {
		nodes: state.project.nodes
	};
};

const mapDispatchToProps = (dispatch) => {
 	return {
 		actions: bindActionCreators({ }, dispatch),
		deselectStatsDetail: () => dispatch(deselectStatsDetail())
 	};
};


export default connect(mapStateToProps, mapDispatchToProps)(StatsProjectList);