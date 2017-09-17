import React, {Component} from 'react';
import {BrowserRouter, Route, Link, Redirect, withRouter} from 'react-router-dom'
import ReactDataGrid from 'react-data-grid';
import * as d3 from 'd3';
import { LineChart } from 'react-d3-basic';

// const config = {
//   apiKey: "AIzaSyDKzNLPprgv5CKpqM75hJODD2mVNZOSrTo",
//   authDomain: "sleepee-6d1c4.firebaseapp.com",
//   databaseURL: "https://sleepee-6d1c4.firebaseio.com",
//   projectId: "sleepee-6d1c4",
//   storageBucket: "sleepee-6d1c4.appspot.com",
//   messagingSenderId: "1081598159008"
// };

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
    columns: [
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
        key: 'sleepAttemptDuration',
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
    fetch('http://localhost:8000/diaries',  { accept: 'application/json', })
      .then((res) => {
        res.json().then((originalDiaries) => {
          console.log('data from server', originalDiaries);
          const diaries = originalDiaries.slice(0);
          this.setState({ originalDiaries, diaries });
        });
      });
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
    console.log(this.state);
    return this.state.diaries[i];
  }

  render() {

    // // TODO: If user didn'
    if (!this.state) {
      return <div> No diaries yet </div>;
    }
    return (
      <ReactDataGrid
        onGridSort={this.handleGridSort.bind(this)}
        columns={this.state.columns}
        rowGetter={this.rowGetter.bind(this)}
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

// http://www.reactd3.org/docs/basic/#line_multiple
class Chart extends Component {
  // constructor() {
  //   super();
  // }
  render() {
    // your date format, use for parsing
  var parseDate = d3.time.format("%YM%m").parse;

  var width = 700,
    height = 300,
    margins = {left: 100, right: 100, top: 50, bottom: 50},
    // chart series,
    // field: is what field your data want to be selected
    // name: the name of the field that display in legend
    // color: what color is the line
    chartSeries = [
      {
        field: 'year',
        name: 'Year'
      },
      {
        field: 'sale',
        name: 'Sale',
      }
    ],
    // your x accessor
    x = function(d) {
      console.log('d in dx', d);
      return d.sale;
    },
    y = (d) => {
      return d.year;
    };

    var data = [{
        "sale": 202,
        "year": "2000"
    }, {
        "sale": 215,
        "year": "2001"
    }, {
        "sale": 179,
        "year": "2002"
    }, {
        "sale": 199,
        "year": "2003"
      }
    ];
    let xLabel = 'Date';
    let yLabel = 'Time';
    let xDomain = d3.extent(data, x);
    let yDomain = d3.extent(data, (y) => { return parseInt( y.year )});

    return (
      <LineChart
       title= "TEAE"
       data= {data}
       width= {width}
       height= {height}
       margins= {margins}
       chartSeries= {chartSeries}
       x= {x}
      xDomain= {xDomain}
      xLabel = {xLabel}
      y= {y}
      yDomain= {yDomain}
      yLabel = {yLabel}
     />
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props);

  }
  render() {
    return (
      <div className='container'>
        <Navbar></Navbar>
        <Route exact path="/" component={Welcome}/>
        <Route path="/login" component={LoginPage}/>
        {/* <PrivateRoute path='/entry' component={Entry}/> */}
        <PrivateRoute path="/diary" component={DiaryTable}/>
        <PrivateRoute path="/chart" component={Chart}/>
      </div>
    );
  }
}

export default App;
