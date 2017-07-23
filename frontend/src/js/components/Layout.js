import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Navbar from './Navbar';
import Footer from './Footer';

export default class Layout extends React.Component {

	render() {
		const containerStyle = {
			  padding: '0px 0px',
		}
		return (
			<MuiThemeProvider>
				<div>
					<Navbar/>

						<div>
							{this.props.children}
						</div>
					<Footer/>
				</div>
			</MuiThemeProvider>
		);
	}
}
