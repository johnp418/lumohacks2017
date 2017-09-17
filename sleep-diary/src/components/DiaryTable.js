import React, { Component } from "react";
// import ReactDataGrid from "react-data-grid";
import ReactTable from "react-table";
import "react-table/react-table.css";

class DiaryTable extends Component {
  constructor() {
    super();

    this.state = {
      diaries: [],
      columns: [
        {
          Header: "ID",
          accessor: "id"
        },
        {
          Header: "Date",
          accessor: "date"
        },
        {
          Header: "Went to bed at",
          accessor: "bedTime"
        },
        {
          Header: "Fell asleep",
          accessor: "sleepTime"
        },
        {
          Header: "How long it took to fall asleep",
          accessor: "sleepAttemptDuration"
        },
        {
          Header: "# time awaken",
          accessor: "awakeFrequency"
        },
        {
          Header: "Woke up at",
          accessor: "awakeTime"
        },
        {
          Header: "Got out of bed at",
          accessor: "outOfBedTime"
        },
        {
          Header: "Comment",
          accessor: "comment"
        }
      ]
    };
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
      <ReactTable data={this.state.diaries} columns={this.state.columns} />
    );
  }
}

export default DiaryTable;
