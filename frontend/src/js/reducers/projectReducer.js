import { FETCH_PROJECT_SUCCESS, FETCH_PROJECT_FAILURE,
		FETCH_NODE_SUCCESS, FETCH_NODE_FAIL, 
		ADD_PROJECT_SUCCESS, ADD_PROJECT_FAIL,
		UPDATE_PROJECT_SUCCESS, UPDATE_PROJECT_FAIL,
		ADD_NODE_SUCCESS, ADD_NODE_FAIL, RESET_UPDATE_STATE } from '../actions/projectActions';

const initialState = {
	projects:[],
	nodes:[],
	error: {},
	isUpdated: false
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
				isUpdated: true
			});

		case ADD_PROJECT_FAIL:
			return Object.assign({}, state, {
				error: action.payload
			});

		case UPDATE_PROJECT_SUCCESS:
			return Object.assign({}, state, {
				error: {},
				isUpdated: true
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

		case RESET_UPDATE_STATE:
			return Object.assign({}, state, {
				error: {},
				isUpdated: false
			});			

		default:
			return state;
	}
}