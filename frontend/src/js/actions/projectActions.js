import Request from 'superagent';
import { ROOT_URL } from '../util/backend';

//action types
export const FETCH_PROJECT_SUCCESS = 'FETCH_PROJECT_SUCCESS';
export const FETCH_PROJECT_FAILURE = 'FETCH_PROJECT_FAILURE';

export const FETCH_NODE_SUCCESS = 'FETCH_NODE_SUCCESS';
export const FETCH_NODE_FAIL = 'FETCH_NODE_FAIL';

export const ADD_PROJECT_SUCCESS = 'ADD_PROJECT_SUCCESS';
export const ADD_PROJECT_FAIL = 'ADD_PROJECT_FAIL';

export const UPDATE_PROJECT_SUCCESS = 'UPDATE_PROJECT_SUCCESS';
export const UPDATE_PROJECT_FAIL = 'UPDATE_PROJECT_FAIL';

export const UPDATE_USER_PROJECT_SUCCESS = 'UPDATE_USER_PROJECT_SUCCESS';
export const UPDATE_NODE_PROJECT_SUCCESS = 'UPDATE_NODE_PROJECT_SUCCESS';

export const ADD_NODE_SUCCESS = 'ADD_NODE_SUCCESS';
export const ADD_NODE_FAIL = 'ADD_NODE_FAIL';

export const REMOVE_NODE_SUCCESS = 'REMOVE_NODE_SUCCESS';
export const REMOVE_NODE_FAIL = 'REMOVE_NODE_FAIL';

export const EDIT_NODE_SUCCESS = 'EDIT_NODE_SUCCESS';
export const EDIT_NODE_FAIL = 'EDIT_NODE_FAIL';

export const RESET_UPDATE_STATE = 'RESET_UPDATE_STATE';
export const RESET_PROJECT_STATE = 'RESET_PROJECT_STATE';

export const SELECT_USER_PROJECT = 'SELECT_USER_PROJECT';

export const SET_SELECTING_STATE = 'SET_SELECTING_STATE';

export const SELECT_PROJECT_MODAL = 'SELECT_PROJECT_MODAL';
export const DESELECT_PROJECT_MODAL = 'DESELECT_PROJECT_MODAL';

export const SELECT_USER_PROJECT_MODAL = 'SELECT_USER_PROJECT_MODAL';
export const DESELECT_USER_PROJECT_MODAL = 'DESELECT_USER_PROJECT_MODAL';

export const SELECT_NODE_PROJECT_MODAL = 'SELECT_NODE_PROJECT_MODAL';
export const DESELECT_NODE_PROJECT_MODAL = 'DESELECT_NODE_PROJECT_MODAL';

export const SELECT_NODE_DETAIL_MODAL = 'SELECT_NODE_DETAIL_MODAL';
export const DESELECT_NODE_DETAIL_MODAL = 'DESELECT_NODE_DETAIL_MODAL';

export const SELECT_STATS_MODAL = 'SELECT_STATS_MODAL';
export const DESELECT_STATS_MODAL = 'DESELECT_STATS_MODAL';

export const SELECT_EDIT_NODE_MODAL = 'SELECT_EDIT_NODE_MODAL';
export const DESELECT_EDIT_NODE_MODAL = 'DESELECT_EDIT_NODE_MODAL';

export const ADD_NODE_LIKE = 'ADD_NODE_LIKE';
export const REMOVE_NODE_LIKE = 'REMOVE_NODE_LIKE';

export const SELECT_TREE_DATA = 'SELECT_TREE_DATA';

//Fetching project process
export function fetchingUserProject(username) {
	return dispatch => {
		return Request
			.get(ROOT_URL + '/projects/' + username)
			.end(function(err,res) {
				if(err)
					dispatch(fetchProjectFailure(err));
				else
					dispatch(fetchProjectSuccess(res.body));
			})
	}
}

export function fetchProjectSuccess(project) {
	return { type: FETCH_PROJECT_SUCCESS, payload: project }
}

export function fetchProjectFailure(error) {
	return { type: FETCH_PROJECT_FAILURE, payload: error }
}

//Fetching node process
export function fetchNodeProject(project_id) {
	return dispatch => {
		return Request
			.get(ROOT_URL + '/nodes/' + project_id)
			.end(function(err,res) {
				if(err)
					dispatch(fetchNodeFailure(err));
				else
				{
					dispatch(fetchNodeSuccess(res.body));
					dispatch(selectTreeData(res.body));
				}
			})
	}
}

export function fetchNodeSuccess(nodes) {
	return { type: FETCH_NODE_SUCCESS, payload: nodes }
}

export function fetchNodeFailure(error) {
	return { type: FETCH_NODE_FAIL, payload: error }
}

//Add new Project Process
export function addNewProject(proj_title, proj_desc, deadlineDate, user,
								node_title, node_desc) {
	return dispatch => {
		return Request.post(ROOT_URL + '/addProject')
				.send({
					title: proj_title,
					desc: proj_desc,
					deadline: deadlineDate,
					users: [user]			
				})
				.end(function(err, res){
					if(res.body.status === 'success')
						dispatch(addNewNode(null, node_title, node_desc, user, 1, 
											null, res.body.id));
					else
						dispatch(addProjectFailure(res.body.message));
				});
	}
}

export function addProjectSuccess(msg) {
	return { type: ADD_PROJECT_SUCCESS, payload: msg }
}

export function addProjectFailure(error) {
	return { type: ADD_PROJECT_FAIL, payload: error }
}

//Update project with more user
export function addUserProject(projects, project_id, targerUser, username) {
	return dispatch => {
		return Request.put(ROOT_URL + '/addUserProject/' + project_id)
				.send({
					user: targerUser			
				})
				.end(function(err, res){
					if(res.body.status === 'success') {
						
						for(let i = 0; i < projects.length; i++)
						{
						    if(projects[i]._id === project_id)
						    {
						    	projects[i].users.push(targerUser);
						    	dispatch(updateUserProjectSuccess(projects[i].users));
						    }
						}							
					}
					else
						dispatch(updateProjectFailure(res.body.message));
				});
	}
}

//Update project with more node
export function addNodeProject(nodes, project_id, node, user) {
	return dispatch => {
		return Request.put(ROOT_URL + '/addNodeProject/' + project_id)
				.send({
					node_id: node._id			
				})
				.end(function(err, res){
					if(res.body.status === 'success')
					{
						//adding primary node to the project
						if(nodes === null) {
							//dispatch(fetchingUserProject(user));
							dispatch(updateProjectSuccess(res.body.message));
						}
						else {
							nodes.push(node);
							dispatch(updateNodeProjectSuccess(nodes));								
						}

					}
					else
						dispatch(updateProjectFailure(res.body.message));
				});
	}
}

export function updateUserProjectSuccess(users) {
	return { type: UPDATE_USER_PROJECT_SUCCESS, payload: users }
}

export function updateNodeProjectSuccess(nodes) {
	return { type: UPDATE_NODE_PROJECT_SUCCESS, payload: nodes }
}

export function updateProjectSuccess(msg) {
	return { type: UPDATE_PROJECT_SUCCESS, payload: msg }
}

export function updateProjectFailure(error) {
	return { type: UPDATE_PROJECT_FAIL, payload: error }
}

//Add new Node Process
export function addNewNode(nodes, node_title, node_desc,
							user, primNode, prevNode, proj_id) {

	const data = {};
	if(primNode === 1)
		Object.assign(data, {
			title: node_title,
			desc: node_desc,
			created_by: user,
			primaryNode: primNode,
			likes: [],
			project_id: proj_id
		});

	else
		Object.assign(data, {
			title: node_title,
			desc: node_desc,
			created_by: user,
			primaryNode: primNode,
			previousNode: prevNode,
			likes: [],
			project_id: proj_id			
		});
	

	return dispatch => {
		return Request.post(ROOT_URL + '/addNode')
				.send(data)
				.end(function(err, res){
					if(res.body.status === 'success')
					{
						if(primNode === 1)
							dispatch(addNodeProject(null, proj_id, res.body.node, user));
						else
							dispatch(addNodeProject(nodes, proj_id, res.body.node, user));
					}
					else
						dispatch(addNodeFailure(res.body.message));
				});
	}
}

export function addNodeSuccess(msg) {
	return { type: ADD_NODE_SUCCESS, payload: msg }
}

export function addNodeFailure(error) {
	return { type: ADD_NODE_FAIL, payload: error }
}

//remove node
export function removeNode(node_id) {
	return dispatch => {
		return Request.delete(ROOT_URL + '/removeNode/' + node_id)
				.end(function(err, res){
					if(res.body.status === 'success')
						dispatch(removeNodeSuccess(res.body.message));
					else
						dispatch(removeNodeFailure(res.body.message));
				});
	}	
}

export function removeNodeSuccess(msg) {
	return { type: REMOVE_NODE_SUCCESS, payload: msg }
}

export function removeNodeFailure(error) {
	return { type: REMOVE_NODE_FAIL, payload: msg }
}

export function editNode(node, user) {

	return dispatch => {
		return Request.put(ROOT_URL + '/updateNode/' + node._id)
				.send({
					title: node.title,
					desc: node.desc,
					previousNode: node.previousNode		
				})
				.end(function(err, res){
					if(res.body.status === 'success')
						dispatch(editNodeSuccess(res.body.message));
					else
						dispatch(editNodeFailure(res.body.message));
				});
	}
}

export function editNodeSuccess(msg) {
	return { type: EDIT_NODE_SUCCESS, payload: msg }
}

export function editNodeFailure(error) {
	return { type: EDIT_NODE_SUCCESS, payload: error }
}

export function selectUserProject(projects, project_id)
{
	for(let i = 0; i < projects.length; i++)
	{
	    if(projects[i]._id === project_id)
	    	return { type: SELECT_USER_PROJECT, payload: projects[i].users }
	}	
}

//ADD PROJECT MODAL
export function selectProjectModal() {
	return { type: SELECT_PROJECT_MODAL }
}

export function deselectProjectModal() {
	return { type: DESELECT_PROJECT_MODAL }
}

//ADD USER MODAL
export function selectUserProjectModal() {
	return { type: SELECT_USER_PROJECT_MODAL }
}

export function deselectUserProjectModal() {
	return { type: DESELECT_USER_PROJECT_MODAL }
}

//ADD NODE MODAL
export function selectNodeProjectModal() {
	return { type: SELECT_NODE_PROJECT_MODAL }
}

export function deselectNodeProjectModal() {
	return { type: DESELECT_NODE_PROJECT_MODAL }
}

export function selectState(project) {
	return { type: SET_SELECTING_STATE, payload: project }
}

//EDIT NODE MODAL
export function selectEditNodeModal(node) {
	return { type: SELECT_EDIT_NODE_MODAL, payload: node  }
}

export function deselectEditNodeModal() {
	return { type: DESELECT_EDIT_NODE_MODAL }
}

//Nodes -> TreeData
export function selectTreeData(nodes)
{
	const data = [];
	const map = {};

	for(let i = 0; i < nodes.length; i++) {

		const node = nodes[i];
		node.children = [];
		node.expanded = true;
		map[node._id] = i;

		//Check if is the primary node
		if(node.primaryNode === 0)
		{
			const displayDate = new Date(node.created_at);
			if(node.likes.length === 0)
				node.subtitle = "Created by " + node.created_by + " at " + 
								displayDate.getDate() + "/" + 
								(displayDate.getMonth() + 1) + "/" +
								displayDate.getFullYear();
			else
				node.subtitle = "Created by " + node.created_by + " at " + 
								displayDate.getDate() + "/" + 
								(displayDate.getMonth() + 1) + "/" +
								displayDate.getFullYear() + " (" +
								node.likes.length + " likes)";				

			nodes[map[node.previousNode]].children.push(node);
		}
		else
			data.push(node);
	}

	return { type: SELECT_TREE_DATA, payload: data }
}

//NODE INFORMATION MODAL
export function selectNodeDetail(node) {
	return { type: SELECT_NODE_DETAIL_MODAL, payload: node }
}

export function deselectNodeDetail(){
	return { type: DESELECT_NODE_DETAIL_MODAL }
}

export function addNodeLike(node_id, username, project_id) {
	return dispatch => {
		return Request.put(ROOT_URL + '/addLike/' + node_id + '/users/' + username)
				.end(function(err, res){
					if(res.body.status === 'success') {
						dispatch(fetchNodeProject(project_id));
					}
					// else
					// 	dispatch(updateProjectFailure(res.body.message));
				});
	}	
}

export function removeNodeLike(node_id, username, project_id) {
	return dispatch => {
		return Request.put(ROOT_URL + '/removeLike/' + node_id + '/users/' + username)
				.end(function(err, res){
					if(res.body.status === 'success') {
						dispatch(fetchNodeProject(project_id));
					}
					// else
					// 	dispatch(updateProjectFailure(res.body.message));
				});
	}
}

//STATS INFORMATION MODAL
export function selectStatsDetail() {
	return { type: SELECT_STATS_MODAL }
}

export function deselectStatsDetail(){
	return { type: DESELECT_STATS_MODAL }
}

export function resetUpdateState() {
	return { type: RESET_UPDATE_STATE }
}

export function resetProjectState() {
	return { type: RESET_PROJECT_STATE }
}
