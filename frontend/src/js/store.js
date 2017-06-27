import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import throttle from 'lodash/throttle';

import rootReducer from './reducers/rootReducer';
import { loadState, saveState } from './util/localStorage';

const persistedState = loadState();

const store = createStore(rootReducer, persistedState, applyMiddleware(thunk));

store.subscribe(throttle(() => {
	saveState({
		userObject: store.getState().userObject
	});
}, 1000));

export default store;