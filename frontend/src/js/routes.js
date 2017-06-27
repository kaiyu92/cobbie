import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store'

import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard'


export default class routes extends React.Component {
	render() {
		return(
			<Provider store={ store }>
			  <Router>
			  	<Layout>
				  	<Switch>
				      <Route exact path="/" component={Home}/>
				      <Route path="/about" component={About}/>
				      <Route path="/login" component={Login}/>
				      <Route path="/dashboard" component={Dashboard}/>
				    </Switch>
			    </Layout>
			  </Router>
			</Provider>  
		);
	}
}
