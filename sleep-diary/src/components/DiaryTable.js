import React, { Component } from "react";
// import ReactDataGrid from "react-data-grid";
import ReactTable from "react-table";
import "react-table/react-table.css";

class DiaryTable extends Component {
  constructor(props) {
    super(props);

    this.columns =  [
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
  }

  render() {
    return (
      <ReactTable className="col-6" data={this.props.diaries} columns={this.columns} />
    );
  }
}

export default DiaryTable;
