import React, { Component } from "react";
import {
  BrowserRouter,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";

class LoginPage extends Component {
  state = {
    redirectToReferrer: false
  };

  login = () => {
    // var provider = new firebase.auth.GoogleAuthProvider();
    // firebase.auth().signInWithPopup(provider).then((result) => {
    //   // This gives you a Google Access Token. You can use it to access the Google API.
    //   var token = result.credential.accessToken;
    //   // The signed-in user info.
    //   var user = result.user;
    //   console.log(result);
    //
    //   // ...
    // }).catch(function(error) {
    //   // Handle Errors here.
    //   var errorCode = error.code;
    //   var errorMessage = error.message;
    //   // The email of the user's account used.
    //   var email = error.email;
    //   // The firebase.auth.AuthCredential type that was used.
    //   var credential = error.credential;
    //   // ...
    //   // this.setState({redirectToReferrer: true})
    // });
    // // fakeAuth.authenticate(() => {
    // //   this.setState({redirectToReferrer: true})
    // // })
  };

  render() {
    const { from } = this.props.location.state || {
      from: {
        pathname: "/"
      }
    };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
      // TODO: Login Page < div > login page here
      <button onClick={this.login}> Log in </button>
    );
  }
}

export default LoginPage;
