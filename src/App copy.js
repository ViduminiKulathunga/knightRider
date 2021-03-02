import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import themeFile from "./util/theme";
import "./App.css";
import jwtDecode from "jwt-decode";
//Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED} from './redux/types';
import {logoutUser, getUserData} from './redux/actions/userActions';
//Routers
import MainRoutes from "./components/Main/Main";
import Login from "./components/Login/Login";
import AuthRoute from "./util/AuthRoute";
import axios from "axios";

const theme = createMuiTheme(themeFile);

let authenticated;
const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  } else {
    store.dispatch({type: SET_AUTHENTICATED});
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
}

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
            <Router>
              <Switch>
                <Route exact path="/" component={MainRoutes} />
                <AuthRoute
                  exact
                  path="/login"
                  component={Login}
                />
              </Switch>
            </Router>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
