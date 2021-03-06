import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./components/layout/Navbar";
import HomePage from "./components/layout/HomePage";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";

import { BookList, BookCreate, BookUpdate } from "./components/book/";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth

  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={HomePage} />
            <Route exact path="/login" component={Login} />
            <PrivateRoute exact path="/books/list" component={BookList} />
            <PrivateRoute exact path="/books/create" component={BookCreate} />
            <PrivateRoute exact path="/books/update/:id" component={BookUpdate} />
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;
