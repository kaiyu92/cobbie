import React from "react";
import { Link } from 'react-router-dom';


export default class Navbar extends React.Component{
	render() {
		return (
		    <nav class="navbar navbar-default navbar-fixed-top">
		      <div class="container">
		        <div class="navbar-header">
		          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
		            <span class="sr-only">Toggle navigation</span>
		            <span class="icon-bar"></span>
		            <span class="icon-bar"></span>
		            <span class="icon-bar"></span>
		          </button>
		          <Link to="/" class="navbar-brand">Cobbie</Link>
		        </div>
		        <div id="navbar" class="navbar-collapse collapse">
		          <ul class="nav navbar-nav">
		            <li><Link to="/">Home</Link></li>
		            <li><Link to="/about">About</Link></li>
		            <li><Link to="/dashboard">Dashboard</Link></li>
		          </ul>
		          <ul class="nav navbar-nav navbar-right">
		            <li><Link to="/login">Login</Link></li>
		            <li><a href="../navbar-static-top/">Get Started</a></li>
		          </ul>
		        </div>
		      </div>
		    </nav>

			);
	}
}