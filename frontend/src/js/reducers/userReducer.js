import { Login_Success, Login_Fail } from '../actions/authActions';
import { FETCH_USER_FULFILLED } from '../actions/userActions';

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
};

export default function userReducer(state=initialState, action) {
	switch(action.type) {
		//Login attempt
		case Login_Success: console.log(action.payload);
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

		default:
			return state;
	}
}