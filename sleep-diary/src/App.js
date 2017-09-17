import React, { Component } from "react";
import {
  BrowserRouter,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";

import LoginPage from "./components/LoginPage";
import DiaryForm from "./components/DiaryForm";
import DiaryTable from "./components/DiaryTable";
import Chart from "./components/Chart";

// const config = {
//   apiKey: "AIzaSyDKzNLPprgv5CKpqM75hJODD2mVNZOSrTo",
//   authDomain: "sleepee-6d1c4.firebaseapp.com",
//   databaseURL: "https://sleepee-6d1c4.firebaseio.com",
//   projectId: "sleepee-6d1c4",
//   storageBucket: "sleepee-6d1c4.appspot.com",
//   messagingSenderId: "1081598159008"
// };

const fakeAuth = {
  isAuthenticated: true,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      fakeAuth.isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: {
              from: props.location
            }
          }}
        />
      )}
  />
);

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        SleepDiary
      </Link>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <Link to="/login">Sign in</Link>
      </div>
    </nav>
  );
};

const Welcome = () => {
  return <div>welcome</div>;
};

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="container">
        <Navbar />
        <Route exact path="/" component={Welcome} />
        <Route path="/login" component={LoginPage} />
        <Route path="/form" component={DiaryForm} />
        {/* <PrivateRoute path='/entry' component={Entry}/> */}
        <PrivateRoute path="/diary" component={DiaryTable} />
        <PrivateRoute path="/chart" component={Chart} />
      </div>
    );
  }
}

export default App;
