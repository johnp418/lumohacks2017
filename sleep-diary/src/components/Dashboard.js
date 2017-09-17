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
      <div>
        <DiaryTable diaries={this.state.diaries}></DiaryTable>
        <Chart diaries={this.state.diaries}></Chart>
      </div>
    );
  }
}

export default Dashboard
