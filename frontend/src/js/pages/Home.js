import React from "react";
import Logo from '../static/img/cobbieicon.png';
import Logo1 from '../static/img/graphic1.png';
import Logo2 from '../static/img/graphic2.png';
import Logo3 from '../static/img/graphic3.png';
import Logo4 from '../static/img/graphic4.png';
import Logo5 from '../static/img/graphic5.png';
import Request from 'superagent';

import { ROOT_URL } from '../util/backend';

export default class Home extends React.Component {

	componentWillMount(){
		// var self = this;
		// Request
		// // .get('http://services.groupkt.com/country/get/iso2code/IN')
		// .get(ROOT_URL + '/users')
		// .end(function(err,res){
		// 	console.log(res.body);
		// 	self.setState({ countries: res.body.RestResponse });
		// })
	}
	render() {
		const imgAlign = {
			paddingLeft: '80px'
		}
		const imgStyle = {
			width: '100%'
		}
		return (
			<div id="home-container">
			  <div id ="first-bar">
			    <img id="image" src={Logo}/>
			    <p>Cobbie is the most popular brainstorming application that
			    allows better productivity & progress in team project</p>
			    <button type="button">Get Started</button>
			  </div>
			  <div id ="sec-bar">
			    <h1> Targeted at project teams.</h1>
			    <h2> Built for corporate and students alike. </h2>
			    <table>
			      <tr>
			        <th>Create a Team</th>
			        <th>Select a Deadline</th>
			        <th>Start Adding Ideas</th>
			        <th>Vote on Each Idea</th>
			        <th>View the Tree</th>
			      </tr>
			      <tr>
			        <th><img id="img" src={Logo1} /></th>
			        <th><img id="img" src={Logo2} /></th>
			        <th><img id="img" src={Logo3} /></th>
			        <th><img id="img" src={Logo4} /></th>
			        <th><img id="img" src={Logo5} /></th>
			      </tr>
					</table>
				</div>
		</div>
		);
	}
}
