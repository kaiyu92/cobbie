import Request from 'superagent';
import { ROOT_URL } from '../util/backend';

//action types
export const Login_Success = 'Login_Success';
export const Login_Fail = 'Login_Fail';
export const Logout = 'Logout';


// Login attempt
export function loginSuccess(userObject) {
	return { type: Login_Success, payload: userObject }
}

export function loginFail(error) {
	return { type: Login_Fail, payload: error }
}

export function attemptLogin(data) {
	return dispatch => {
		return Request
			.post(ROOT_URL + '/login')
			.send(data)
			.end(function(err,res) {
				if(res.body.status === 'success') {
					dispatch(loginSuccess(res.body.user));
				}
				else
				{
					dispatch(loginFail(res.body.message));
				}
			})
	}
}

export function attemptLogout() {
	return { type: Logout }
}
