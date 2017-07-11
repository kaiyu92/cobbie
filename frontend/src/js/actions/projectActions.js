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

export const ADD_NODE_SUCCESS = 'ADD_NODE_SUCCESS';
export const ADD_NODE_FAIL = 'ADD_NODE_FAIL';

export const RESET_UPDATE_STATE = 'RESET_UPDATE_STATE';

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
					dispatch(fetchNodeSuccess(res.body));
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
						dispatch(addNewNode(node_title, node_desc, user, 1, 
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
export function addUserProject(project_id, user) {
	return dispatch => {
		return Request.put(ROOT_URL + '/addUserProject/' + project_id)
				.send({
					user: user			
				})
				.end(function(err, res){
					if(res.body.status === 'success')
						dispatch(addProjectSuccess(res.body.message));
					else
						dispatch(updateProjectFailure(res.body.message));
				});
	}
}

//Update project with more node
export function addNodeProject(project_id, node_id) {
	return dispatch => {
		return Request.put(ROOT_URL + '/addNodeProject/' + project_id)
				.send({
					node_id: node_id			
				})
				.end(function(err, res){
					if(res.body.status === 'success')
						dispatch(addProjectSuccess(res.body.message));
					else
						dispatch(updateProjectFailure(res.body.message));
				});
	}
}

export function updateProjectSuccess(msg) {
	return { type: UPDATE_PROJECT_SUCCESS, payload: msg }
}

export function updateProjectFailure(error) {
	return { type: UPDATE_PROJECT_FAIL, payload: error }
}

//Add new Node Process
export function addNewNode(node_title, node_desc,
							user, primNode, prevNode, proj_id) {

	const data = {};
	if(primNode === 1)
		Object.assign(data, {
			title: node_title,
			desc: node_desc,
			created_by: user,
			primaryNode: primNode,
			project_id: proj_id
		});
	else
		Object.assign(data, {
			title: node_title,
			desc: node_desc,
			created_by: user,
			primaryNode: primNode,
			previousNode: prevNode,
			project_id: proj_id			
		});
	

	return dispatch => {
		return Request.post(ROOT_URL + '/addNode')
				.send(data)
				.end(function(err, res){
					if(res.body.status === 'success')
					{
						dispatch(addNodeProject(proj_id, res.body.id));
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

export function resetUpdateState() {
	return { type: RESET_UPDATE_STATE }
}
