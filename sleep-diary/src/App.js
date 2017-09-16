import React, { Component } from 'react';
import './styles/App.css';
import {
  BrowserRouter,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'

////////////////////////////////////////////////////////////
// 1. Click the public page
// 2. Click the protected page
// 3. Log in
// 4. Click the back button, note the URL each time

// const AuthExample = () => (
//     <div>
//       <AuthButton/>
//       <ul>
//         <li><Link to="/public">Public Page</Link></li>
//         <li><Link to="/protected">Protected Page</Link></li>
//       </ul>
//       <Route path="/public" component={Public}/>
//       <Route path="/login" component={Login}/>
//       <PrivateRoute path="/" component={Protected}/>
//     </div>
//     <Navbar></Navbar>
// )

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100) // fake async
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}

const Public = () => <h3>Public</h3>
const Protected = () => <h3>Protected</h3>

class Login extends Component {
  state = {
    redirectToReferrer: false
  }

  login = () => {
    fakeAuth.authenticate(() => {
      this.setState({ redirectToReferrer: true })
    })
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state

    if (redirectToReferrer) {
      return (
        <Redirect to={from}/>
      )
    }

    return (
      // TODO: Login Page
      <div>
        <button onClick={this.login}>Log in</button>
      </div>
    )
  }
}

class Main extends Component {
  // const AuthButton = withRouter(({ history }) => (
  //   fakeAuth.isAuthenticated ? (
  //     <p>
  //       Welcome! <button onClick={() => {
  //         fakeAuth.signout(() => history.push('/'))
  //       }}>Sign out</button>
  //     </p>
  //   ) : (
  //     <Login></Login>
  //   )
  // ))



  render() {


    return fakeAuth.isAuthenticated ? <div>authenticated</div> : <div> login first </div>
  }

}

class Navbar extends Component {
  render() {
    return (
      <div>Navbar here</div>
    )
    // return (
    //   <div>
    //     <nav class="navbar navbar-expand-lg navbar-light bg-light">
    //       <a class="navbar-brand" href="#">SleepDiary</a>
    //       <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    //         <span class="navbar-toggler-icon"></span>
    //       </button>
    //
    //       <div class="collapse navbar-collapse" id="navbarSupportedContent">
    //         <form class="form-inline my-2 my-lg-0">
    //           <Login></Login>
    //         </form>
    //       </div>
    //     </nav>
    //   </div>
    // );
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    fakeAuth.isAuthenticated ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

const Diary = () => {
  return (
    <div>Diary</div>
  )
}

class App extends Component {
  render() {
    return (
      <div>
        <Route path="/" component={Main}/>
        <Route path="/login" component={Login}/>
        <PrivateRoute path="/diary" component={Diary}/>
      </div>
    );
  }
}

export default App;
