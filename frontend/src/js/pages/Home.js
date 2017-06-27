import React from "react";
import Logo from '../static/img/cobbieicon.png';
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
				<div class="container">				
					<div class="row">
						<div class="col-xs-3 col-sm-3" style={imgAlign}>
							<img src={Logo} style={imgStyle}/>
						</div>
						<div class="col-xs-9 col-sm-9">
							<h3>Cobbie is the most popular brainstorming application that
							allows better productivity & progress in team project</h3>
						</div>
					</div>
				</div>
		);
	}
}