export const FETCH_USER_FULFILLED = 'FETCH_USER_FULFILLED';

export function fetchUser() {
	return {
		type: FETCH_USER_FULFILLED,
		payload: {
			name: "Sylvia Swee Wan Xuan",
			age: 20
		}
	}
}