import React from "react";
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { resetProjectState } from '../actions/projectActions';
import { attemptLogout } from '../actions/authActions';
import { resetSignUp } from '../actions/user';

class Navbar extends React.Component{
	constructor(props) {
		super(props);

		this.resetSignUp = this.resetSignUp.bind(this);
		this.logOut = this.logOut.bind(this);
	}

	logOut(e) {
		e.preventDefault();
		const targetLink = e.target.getAttribute("href");

		this.props.resetProjectState();
		this.props.attemptLogout();
		this.props.transitNext(targetLink);
	}

	resetSignUp(e) {
		e.preventDefault();
		const targetLink = e.target.getAttribute("href");

		this.props.resetSignUp();
		this.props.transitNext(targetLink);
	}

	render() {
		const { isLoggedIn, username } = this.props;

		return (
		    <nav class="navbar navbar-default navbar-fixed-top">
		      <div class="container-fluid">
		        <div class="navbar-header">
		          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
		            <span class="sr-only">Toggle navigation</span>
		            <span class="icon-bar"></span>
		            <span class="icon-bar"></span>
		            <span class="icon-bar"></span>
		          </button>
		          <Link to="/" class="navbar-brand">Cobbie</Link>
		        </div>
		        <div id="navbar" class="collapse navbar-collapse">
		          <ul class="nav navbar-nav">
		            <li><Link to="/" onClick={this.resetSignUp}>Home</Link></li>
		            <li><Link to="/about" onClick={this.resetSignUp}>About</Link></li>
		            <li><Link to="/guide" onClick={this.resetSignUp}>Getting started</Link></li>
		            <li><Link to="/dashboard" onClick={this.resetSignUp}>Dashboard</Link></li>
		          </ul>
		          	{
		          		isLoggedIn ? (
		          			<ul class="nav navbar-nav navbar-right">
		          				<li><a href="#">Welcome, {username}</a></li>
		          				<li><Link to="/" onClick={this.logOut}>Log Out</Link></li>
		          			</ul>
		          		) : (
		          			<ul class="nav navbar-nav navbar-right">
		            			<li><Link to="/login" onClick={this.resetSignUp}>Login</Link></li>
		            			<li><Link to="/register" onClick={this.resetSignUp}>Register</Link></li>
		            		</ul>
		            	)
		          	}
		        </div>
		      </div>
		    </nav>

			);
	}
}

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.user.isLoggedIn,
		username: state.user.userObject.user
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators({ }, dispatch),
		transitNext: (url) => dispatch(push(url)),
		resetProjectState: () => dispatch(resetProjectState()),
		attemptLogout:() => dispatch(attemptLogout()),
		resetSignUp:() => dispatch(resetSignUp())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
