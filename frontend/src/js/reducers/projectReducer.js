import { FETCH_PROJECT_SUCCESS, FETCH_PROJECT_FAILURE } from '../actions/projectActions';

const initialState = {
	projects:[],
	error: {}
};

export default function projectReducer(state=initialState, action) {
	switch(action.type) {
		//Login attempt
		case FETCH_PROJECT_SUCCESS:
			return Object.assign({}, state, { 
				projects: action.payload
			});

		case FETCH_PROJECT_FAILURE:
			return Object.assign({}, state, {
				error: action.payload
			});

		default:
			return state;
	}
}