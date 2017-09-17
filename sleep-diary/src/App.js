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
import Dashboard from "./components/Dashboard";

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
    <nav className="navbar navbar-expand-lg navbar-light bg-light nav-bottom">
      <Link className="navbar-brand mr-auto" to="/">
        SleepDiary
      </Link>
      <ul className="nav justify-content-end">
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard"> Dashboard </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/form"> Add diary </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login"> Sign in </Link>
        </li>
      </ul>
    </nav>
  );
};

const Welcome = () => {
  return (
    <div>
      welcome
    </div>
  )
}

// class Dashboard extends Component {
//   state = {
//     diaries: []
//   }
//   constructor() {
//     super();
//   }
//
//   componentDidMount() {
//     fetch('http://localhost:8000/diaries',  { accept: 'application/json', })
//       .then((res) => {
//         res.json().then((originalDiaries) => {
//           console.log('data from server', originalDiaries);
//           const diaries = originalDiaries.slice(0);
//           this.setState({ originalDiaries, diaries });
//         });
//       });
//   }
//   render() {
//     return (
//       <div>
//         <DiaryTable diaries={this.state.diaries}></DiaryTable>
//         <Chart diaries={this.state.diaries}></Chart>
//       </div>
//     );
//   }
// }

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="">
        <Navbar />
        <Route exact path="/" component={Welcome} />
        <Route path="/login" component={LoginPage} />
        <Route path="/form" component={DiaryForm} />
        {/* <PrivateRoute path='/entry' component={Entry}/> */}
        <PrivateRoute path="/dashboard" component={Dashboard} />
        {/* <PrivateRoute path="/diary" component={DiaryTable}/>
        <PrivateRoute path="/chart" component={Chart}/> */}
      </div>
    );
  }
}

export default App;
