import React, {Component} from 'react';
import {BrowserRouter, Route, Link, Redirect, withRouter} from 'react-router-dom'
import ReactDataGrid from 'react-data-grid';
// import 'node_modules/bootstrap/dist/css/bootstrap.css';

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

class DiaryTable extends Component {
  state = {
    diaries: [],
    originalDiaries: [],
    // [
    //   {
    //     "model": "diary.diary",
    //     "id": 10,
    //     "date": "2017-09-16",
    //     "bedTime": "22:37:20",
    //     "sleepTime": "22:37:20",
    //     "sleepAtteptDuration": "00:00:30",
    //     "awakeFrequency": 0,
    //     "sleepDuration": "00:01:00",
    //     "awakeTime": "22:37:30",
    //     "outOfBedTime": "22:37:30",
    //     "comment": "hi there",
    //     "nap": null
    //   }
    // ]
    columns: [
      {
        key: 'id',
        name: 'ID',
        locked: true
      },
      {
        key: 'date',
        name: 'Date',
        width: 200,
        sortable: true
      },
      {
        key: 'bedTime',
        name: 'Went to bed at',
        width: 200,
        sortable: true
      },
      {
        key: 'sleepTime',
        name: 'Fell asleep',
        width: 200,
        sortable: true
      },
      {
        key: 'sleepAtteptDuration',
        name: 'How long it took to fall sleep',
        width: 200,
        sortable: true
      },
      {
        key: 'awakeFrequency',
        name: '# time awaken',
        width: 200,
        sortable: true
      },
      {
        key: 'awakeTime',
        name: 'Woke up at',
        width: 200,
        sortable: true
      },
      {
        key: 'outOfBedTime',
        name: 'Got out of bed at',
        width: 200,
        sortable: true
      },
      {
        key: 'comment',
        name: 'Comment',
        width: 200,
        sortable: true
      }
    ]
  };
  componentDidMount() {
    // fetch('http://localhost:8000/diaries',  { accept: 'application/json', })
    //   .then((response) => {
    //     console.log(response);
    //     return response.json();
    //   }).then((originalDiaries) => {
    //     console.log('data from server', diaries);
    //     const diaries = originalDiaries.slice(0);
    //     // Store the original rows array, and make a copy that can be used for modifying eg.filtering, sorting
    //     this.setState({ originalDiaries, diaries });
    //   });
  }

  handleGridSort(sortColumn, sortDirection) {
    const comparer = (a, b) => {
      if (sortDirection === 'ASC') {
        return (a[sortColumn] > b[sortColumn]) ? 1 : -1;
      } else if (sortDirection === 'DESC') {
        return (a[sortColumn] < b[sortColumn]) ? 1 : -1;
      }
    };
    const rows = sortDirection === 'NONE' ? this.state.originalDiaries.slice(0) : this.state.diaries.sort(comparer);
    this.setState({ diaries:rows });
  }

  rowGetter(i) {
    return this.state.diaries[i];
  }

  render() {
    return <div>rempty</div>
    // if (!this.user.filedTodayEntry) {
    //   <Redirect to={{
    //     pathname: '/login',
    //     state: {
    //       from: props.location
    //     }
    //   }}/>
    // }
    // TODO: If user didn'
    if (this.state.diaries.length === 0) {
      return <div> No diaries yet </div>;
    }
    return (
      <ReactDataGrid
        onGridSort={this.handleGridSort}
        columns={this.state.columns}
        rowGetter={this.rowGetter}
        rowsCount={this.state.diaries.length}
        minHeight={500} />
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
    fetch('http://localhost:8000/diaries',  { accept: 'application/json', })
      .then((response) => {
        console.log(response);
        return response.json();
      }).then((originalDiaries) => {
        console.log('data from server', diaries);
        const diaries = originalDiaries.slice(0);
        // Store the original rows array, and make a copy that can be used for modifying eg.filtering, sorting
        // this.setState({ originalDiaries, diaries });
      });
  }
  render() {
    return (
      <div className='container'>
        <Navbar></Navbar>
        <Route exact path="/" component={Welcome}/>
        <Route path="/login" component={LoginPage}/>
        {/* <PrivateRoute path='/entry' component={Entry}/> */}
        <PrivateRoute path="/diary" component={DiaryTable}/>
        {/* <PrivateRoute path="/chart" component={Chart}/> */}
      </div>
    );
  }
}

export default App;
