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
			    <p>The most popular brainstorming application.</p>
			    <button type="button">Get Started</button>
			  </div>
				<div id="inbetw-bar">
					<h1> Productivity & Progress </h1>
					<p> In the scenario where brainstorming becomes complex, Cobbie is there to help to sort it out. Targeted for project teams, Cobbie consolidates ideas to help streamline the brainstorming process. </p>
				</div>
			  <div id ="sec-bar">
					<h1> Visualise your ideas. </h1>
			    <table>
			      <tr id="pic-text">
			        <th>Create a Team</th>
			        <th>Select a Deadline</th>
			        <th>Start Adding Ideas</th>
			        <th>Vote on Each Idea</th>
			        <th>View the Tree</th>
			      </tr>
			      <tr>
			        <th><img class="img" src={Logo1} /></th>
			        <th><img class="img-two" src={Logo2} /></th>
			        <th><img class="img-two" src={Logo3} /></th>
			        <th><img class="img-two" src={Logo4} /></th>
			        <th><img class="img" src={Logo5} /></th>
			      </tr>
					</table>
				</div>
		</div>
		);
	}
}
