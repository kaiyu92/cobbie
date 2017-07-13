import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import throttle from 'lodash/throttle';

import rootReducer from './reducers/rootReducer';
import { saveState } from './util/localStorage';

export default function configureStore(initialState, history) {
	const middewares = [thunk, history];

	const store = createStore(rootReducer, initialState, applyMiddleware(...middewares));
	store.subscribe(throttle(() => {
	saveState({
		userObject: store.getState().userObject
	});
	}, 1000));
	return store;
}





