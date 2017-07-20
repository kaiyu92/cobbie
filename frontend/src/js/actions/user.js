import Request from 'superagent';
import { ROOT_URL } from '../util/backend';

//action types
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAIL = 'SIGNUP_FAIL'
export const RESET_SIGNUP = 'RESET_SIGNUP';

// Login attempt
export function SignUpSuccess(msg) {
	return { type: SIGNUP_SUCCESS, payload: msg }
}

export function SignUpFail(error) {
	return { type: SIGNUP_FAIL, payload: error }
}

export function attemptRegister(data) {
	return dispatch => {
		return Request
			.post(ROOT_URL + '/addUser')
			.send(data)
			.end(function(err,res) {
				if(res.body.status === 'success') {
					dispatch(SignUpSuccess(res.body.message));
				}
				else
				{
					dispatch(SignUpFail(res.body.message));
				}
			})
	}
}

export function resetSignUp() {
	return { type: RESET_SIGNUP }
}
