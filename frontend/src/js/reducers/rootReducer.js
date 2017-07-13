import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';

import user from './userReducer';
import project from './projectReducer';

const rootReducer = combineReducers({
	user,
	project,
	//Add routerReducer
	router: routerReducer,
	
	//Add formReducer
	form: formReducer
});

export default rootReducer;