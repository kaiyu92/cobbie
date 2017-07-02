import Request from 'superagent';
import { ROOT_URL } from '../util/backend';

//action types
export const FETCH_PROJECT_SUCCESS = 'FETCH_PROJECT_SUCCESS';
export const FETCH_PROJECT_FAILURE = 'FETCH_PROJECT_FAILURE';

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