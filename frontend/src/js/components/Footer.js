import React from 'react';
import { connect } from 'react-redux';

class Footer extends React.Component {
	render() {
		const { isLoggedIn } = this.props;
		const footerStyle = {
			  position: 'absolute',
			  bottom: '0',
			  width: '100%',
		}

		return (
			<div>
				<footer style={footerStyle}>
					{
						isLoggedIn ? (
							<div class="container-fluid">
								<div class="row">
									<div class="col-xs-9 col-sm-10 col-sm-offset-2 col-xs-offset-3">
										<hr/>
			        					<p>&copy; 2017 Cobbie, Inc.</p>
			        				</div>		
		        				</div>
		        			</div>							
						) : (
							<div class="container">
								<div class="row">
										<hr/>
			        					<p>&copy; 2017 Cobbie, Inc.</p>	
		        				</div>
		        			</div>	
						)
					}
      			</footer>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.user.isLoggedIn,
	};
};

export default connect(mapStateToProps)(Footer);