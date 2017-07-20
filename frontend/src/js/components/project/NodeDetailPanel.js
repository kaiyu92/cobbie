import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { deselectNodeDetail } from '../../actions/projectActions';

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

class NodeDetailPanel extends React.Component {

	constructor(props) {
		super(props);

		this.closeNodeDetailModal = this.closeNodeDetailModal.bind(this);
	}

	closeNodeDetailModal() {
		this.props.deselectNodeDetail();
	}	

    render() {
    	const { selectedNode, nodes } = this.props;

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
		nodes: state.project.nodes
	};
};

const mapDispatchToProps = (dispatch) => {
 	return {
 		actions: bindActionCreators({ }, dispatch),
		deselectNodeDetail: () => dispatch(deselectNodeDetail())
 	};
};


export default connect(mapStateToProps, mapDispatchToProps)(NodeDetailPanel);