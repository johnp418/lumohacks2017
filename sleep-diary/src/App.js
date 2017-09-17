import React, {Component} from 'react';
import {BrowserRouter, Route, Link, Redirect, withRouter} from 'react-router-dom'
import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyDKzNLPprgv5CKpqM75hJODD2mVNZOSrTo",
  authDomain: "sleepee-6d1c4.firebaseapp.com",
  databaseURL: "https://sleepee-6d1c4.firebaseio.com",
  projectId: "sleepee-6d1c4",
  storageBucket: "sleepee-6d1c4.appspot.com",
  messagingSenderId: "1081598159008"
};

////////////////////////////////////////////////////////////
// 1. Click the public page
// 2. Click the protected page
// 3. Log in
// 4. Click the back button, note the URL each time

class LoginPage extends Component {
  state = {
    redirectToReferrer: false
  }

  login = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      console.log(result);

      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
      // this.setState({redirectToReferrer: true})
    });
    // fakeAuth.authenticate(() => {
    //   this.setState({redirectToReferrer: true})
    // })
  }

  render() {
    const {from} = this.props.location.state || {
      from: {
        pathname: '/'
      }
    }
    const {redirectToReferrer} = this.state

    if (redirectToReferrer) {
      return (<Redirect to={from}/>)
    }

    return (
    // TODO: Login Page < div > login page here
      <button onClick={ this.login }> Log in </button>
    );
  }
}

const fakeAuth = {
  isAuthenticated: true,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100) // fake async
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (fakeAuth.isAuthenticated
    ? (<Component {...props}/>)
    : (<Redirect to={{
      pathname: '/login',
      state: {
        from: props.location
      }
    }}/>))}/>
)

class Diary extends Component {
  // state = {
  //
  // };
  componentDidMount() {
    fetch('diaries',  { accept: 'application/json', })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log('data from server', data);
      });
  }

  render() {
    return (
      <div>Diary</div>
    )
  }
}

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className='navbar-brand' to='/'>
          SleepDiary
        </Link>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <Link to="/login">
          Sign in
        </Link>
      </div>
    </nav>
  );
}

const Welcome = () => {
  return (
    <div>
      welcome
    </div>
  )
}

class App extends Component {
  constructor(props) {
    super(props);
    firebase.initializeApp(config);
  }
  render() {
    return (
      <div className='container'>
        <Navbar></Navbar>
        <Route exact path="/" component={Welcome}/>
        <Route path="/login" component={LoginPage}/>
        <PrivateRoute path="/diary" component={Diary}/>
      </div>
    );
  }
}

export default App;
