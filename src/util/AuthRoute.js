import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

/**
 *Handling public routing
 *
 * @param {*} { component, ...rest }
 * @returns
 */
const AuthRoute = ({ component: Component, authenticated, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      authenticated === true ? <Redirect to="/" /> : <Component {...props} />
    }
  />
);

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});

AuthRoute.prototype = {
  user: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(AuthRoute);