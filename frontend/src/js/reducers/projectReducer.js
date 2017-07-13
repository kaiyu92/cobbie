import { FETCH_PROJECT_SUCCESS, FETCH_PROJECT_FAILURE,
		FETCH_NODE_SUCCESS, FETCH_NODE_FAIL, 
		ADD_PROJECT_SUCCESS, ADD_PROJECT_FAIL,
		UPDATE_PROJECT_SUCCESS, UPDATE_PROJECT_FAIL,
		ADD_NODE_SUCCESS, ADD_NODE_FAIL, 
		RESET_UPDATE_STATE, SELECT_USER_PROJECT,
		SET_SELECTING_STATE, SELECT_PROJECT_MODAL,
		DESELECT_PROJECT_MODAL,
		SELECT_USER_PROJECT_MODAL, DESELECT_USER_PROJECT_MODAL,
		SELECT_NODE_PROJECT_MODAL, DESELECT_NODE_PROJECT_MODAL } from '../actions/projectActions';

const initialState = {
	projects:[],
	nodes:[],
	error: {},
	isUpdated: false,
	isProjectSelected: false,
	selectedProject_id: '',
	project_users: [],
	project_modal: false,
	user_modal: false,
	node_modal: false
};

export default function projectReducer(state=initialState, action) {
	switch(action.type) {

		case FETCH_PROJECT_SUCCESS:
			return Object.assign({}, state, { 
				projects: action.payload
			});

		case FETCH_PROJECT_FAILURE:
			return Object.assign({}, state, {
				error: action.payload
			});

		case FETCH_NODE_SUCCESS:
			return Object.assign({}, state, { 
				nodes: action.payload
			});

		case FETCH_NODE_FAIL:
			return Object.assign({}, state, {
				error: action.payload
			});

		case ADD_PROJECT_SUCCESS:
			return Object.assign({}, state, {
				error: {},
				isUpdated: true,
			});

		case ADD_PROJECT_FAIL:
			return Object.assign({}, state, {
				error: action.payload
			});

		case UPDATE_PROJECT_SUCCESS:
			return Object.assign({}, state, {
				error: {},
				isUpdated: true,
				project_modal: false,
				user_modal: false,
				node_modal: false
			});

		case UPDATE_PROJECT_FAIL:
			return Object.assign({}, state, {
				error: action.payload
			});

		case ADD_NODE_SUCCESS:
			return Object.assign({}, state, {
				error: {},
				isUpdated: true
			});

		case ADD_NODE_FAIL:
			return Object.assign({}, state, {
				error: action.payload
			});	

		case SELECT_USER_PROJECT:
			return Object.assign({}, state, {
				project_users: action.payload
			});

		case SET_SELECTING_STATE:
			return Object.assign({}, state, {
				isProjectSelected: true,
				selectedProject_id: action.payload
			})

		case SELECT_PROJECT_MODAL:
			return Object.assign({}, state, {
				project_modal: true,
				user_modal: false,
				node_modal: false
			})

		case DESELECT_PROJECT_MODAL:
			return Object.assign({}, state, {
				project_modal: false,
			})

		case SELECT_USER_PROJECT_MODAL:
			return Object.assign({}, state, {
				project_modal: false,
				user_modal: true,
				node_modal: false
			})

		case DESELECT_USER_PROJECT_MODAL:
			return Object.assign({}, state, {
				user_modal: false
			})						

		case SELECT_NODE_PROJECT_MODAL:
			return Object.assign({}, state, {
				project_modal: false,
				user_modal: false,
				node_modal: true
			})

		case DESELECT_NODE_PROJECT_MODAL:
			return Object.assign({}, state, {
				node_modal: false
			})						

		case RESET_UPDATE_STATE:
			return Object.assign({}, state, {
				error: {},
				isUpdated: false,
				isProjectSelected: false,
				project_modal: false,
				user_modal: false,
				node_modal: false
			});			

		default:
			return state;
	}
}