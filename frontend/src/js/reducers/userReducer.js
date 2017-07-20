import { Login_Success, Login_Fail, Logout } from '../actions/authActions';
import { SIGNUP_SUCCESS, SIGNUP_FAIL, RESET_SIGNUP } from '../actions/user';

const initialState = {
	isAuthenticated: false,
	isLoggedIn: false,
	error: {},
	userObject: {
		_id: '',
		user: '',
		name: '',
		email: '',
		password: ''
	},
	signupInfo: {
		msg: {},
		error: {},
	}
};

export default function userReducer(state=initialState, action) {
	switch(action.type) {
		//Login attempt
		case Login_Success:
			return Object.assign({}, state, { 
				isAuthenticated: true,
				isLoggedIn: true,
				userObject : {
								_id: action.payload._id,
								user: action.payload.user,
								name: action.payload.firstName + action.payload.lastName,
								email: action.payload.email,
								password: action.payload.password
							}
			});

		case Login_Fail:
			return Object.assign({}, state, {
				error: action.payload
			});
		case Logout:
			return Object.assign({}, state, { 
				isAuthenticated: false,
				isLoggedIn: false,
				error: {},
				userObject : {
								_id: '',
								user: '',
								name: '',
								email: '',
								password: ''
							}
			});

		case SIGNUP_SUCCESS:
			return Object.assign({}, state, {
				signupInfo: {
					msg: action.payload,
					error: {},
				}
			});

		case SIGNUP_FAIL:
			return Object.assign({}, state, {
				signupInfo: {
					msg: {},
					error: action.payload,
				}
			});

		case RESET_SIGNUP:
			return Object.assign({}, state, {
				signupInfo: {
					msg: {},
					error: {},
				}
			});

		default:
			return state;
	}
}