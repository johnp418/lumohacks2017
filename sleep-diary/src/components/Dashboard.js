import React, { Component } from 'react';
import Chart from './Chart';
import DiaryTable from './DiaryTable';

class Dashboard extends Component {
  state = {
    diaries: [],
  }
  componentDidMount() {
    fetch("http://localhost:8000/diaries", {
      accept: "application/json"
    }).then(res => {
      res.json().then(data => {
        console.log("data from server", data);
        this.setState({ diaries: data });
      });
    });
  }
  render() {
    return (
      <div className="row">
        <Chart diaries={this.state.diaries}></Chart>
        <DiaryTable diaries={this.state.diaries}></DiaryTable>
      </div>
    );
  }
}

export default Dashboard
