import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { deselectNodeDetail, fetchNodeFeedback } from '../../actions/projectActions';

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

function formatDate(d) {
	var displayDate = new Date(d);
	return displayDate.getDate() + "/" +
				 (displayDate.getMonth() + 1) + "/" +
					displayDate.getFullYear() + " " +
					displayDate.getHours() + ":" +
					displayDate.getMinutes();
}

class NodeDetailPanel extends React.Component {

	constructor(props) {
		super(props);

		//Fetch all the feedbacks that is associated to this node
		const { selectedNode } = this.props;
		this.props.fetchNodeFeedback(selectedNode._id);
		this.closeNodeDetailModal = this.closeNodeDetailModal.bind(this);
	}

	closeNodeDetailModal() {
		this.props.deselectNodeDetail();
	}

    render() {
    	const { selectedNode, nodes, node_feedbacks } = this.props;

        return (
        		<div>
        			<h3 style={{ textAlign: 'center'}}>{selectedNode.title}</h3>
        			<div>
        				<ul class="list-group">
						  <li class="list-group-item">
						  	<h4 class="list-group-item-heading">Tree Path</h4>
						  	<p class="list-group-item-text">{getTreePath(selectedNode, nodes)}</p>
						  </li>
						  <li class="list-group-item">
						  	<h4 class="list-group-item-heading">Purposed Idea</h4>
						  	<p class="list-group-item-text">{selectedNode.desc}</p>
						  </li>
						  <li class="list-group-item">
						  	<h4 class="list-group-item-heading">Idealist</h4>
						  	<p class="list-group-item-text">{selectedNode.subtitle}</p>
						  </li>
						  <li class="list-group-item">
						  	<h4 class="list-group-item-heading">{selectedNode.likes.length} likes</h4>
						  	<div class="list-group-item-text">
						  		<ul class ="list-group">
						        {
						          	selectedNode.likes.map(function(user_like){
						          			return <li key={ user_like } class="list-group-item">
						          							{ user_like }
						          					</li>;
						          	})
					        	}
						  		</ul>
						  	</div>
						  </li>
							<li class="list-group-item">
						  	<h4 class="list-group-item-heading">Feedbacks</h4>
						  	<div class="list-group-item-text">
						  		<ul class ="list-group">
						        {
						          	node_feedbacks.map(function(feedback){
						          			return <li key={ feedback._id } class="list-group-item">
																		<h4 class ="list-group-item-heading"><p>{ feedback.author }: { feedback.comment }</p></h4>
																		<div class="list-group-item-text">
																			Commented at { formatDate(feedback.created_at) }
																		</div>
						          						</li>;
						          	})
					        	}
						  		</ul>
						  	</div>
						  </li>
						</ul>
					    <button onClick={this.closeNodeDetailModal}
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
		selectedNode: state.project.selectedNode,
		nodes: state.project.nodes,
		node_feedbacks: state.project.node_feedbacks,
	};
};

const mapDispatchToProps = (dispatch) => {
 	return {
 		actions: bindActionCreators({ }, dispatch),
		fetchNodeFeedback: (node_id) => {
			dispatch(fetchNodeFeedback(node_id));
		},
		deselectNodeDetail: () => dispatch(deselectNodeDetail())
 	};
};


export default connect(mapStateToProps, mapDispatchToProps)(NodeDetailPanel);
