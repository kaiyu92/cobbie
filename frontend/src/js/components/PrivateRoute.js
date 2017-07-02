import React, { PropTypes } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component, exact = false, path, authenticated }) => (
  <Route
    exact={exact}
    path={path}
    render={props => (
      authenticated ? (
        React.createElement(component, props)
      ) : (
        <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }}/>
      )
    )}
  />
);

const { object, bool, string, func } = PropTypes;

const mapStateToProps = (state) => {
	return {
		authenticated: state.user.isLoggedIn,
	};
};

PrivateRoute.propTypes = {
  component: func.isRequired,
  exact: bool,
  path: string.isRequired,
  authenticated: bool.isRequired,
  location: object
};

export default connect(mapStateToProps)(PrivateRoute);