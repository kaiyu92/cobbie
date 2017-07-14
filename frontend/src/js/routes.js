import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import { Provider } from 'react-redux';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';

import configureStore from './store'
import { loadState } from './util/localStorage';

import Layout from './components/Layout';
import PrivateRoute from './components/PrivateRoute';

import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

const persistedState = loadState();

//Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();

//Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history);

const store = configureStore(persistedState, middleware);

//Dashboard routes
const DashboardRoutes = () => (
	<Switch>
		<Route exact path='/dashboard' component={Dashboard}/>
		<Route path='/dashboard/:project_id' component={Dashboard}/>
	</Switch>
)

export default class routes extends React.Component {

	render() {
		//console.log(store.getState());
		return(
			<Provider store={ store }>
			  { /*ConnectedRouter will use the store from Provider automatically */ }
			  <ConnectedRouter history={history}>
			  	<Layout>
				  	<Switch>
				      <Route exact path="/" component={Home}/>
				      <Route path="/about" component={About}/>
				      <Route path="/login" component={Login}/>
				      <PrivateRoute path="/dashboard" component={DashboardRoutes}/>
				    </Switch>
			    </Layout>
			  </ConnectedRouter>
			</Provider>  
		);
	}
}
