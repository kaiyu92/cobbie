import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { fetchUser } from '../actions/userActions';

import Navbar from "./Navbar";

export default class Layout extends React.Component {

	render() {
		const containerStyle = {
			  padding: '80px 15px',
		}
		return (
			<MuiThemeProvider>
				<div>
					<Navbar/>
								
						<div style={containerStyle}>
							{this.props.children}
						</div>
					
				</div>
			</MuiThemeProvider>
		);
	}
}