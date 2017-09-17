import React, { Component } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import moment from "moment";

// http://www.reactd3.org/docs/basic/#line_multiple
class Chart extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.diaries) {
      return <div> No data </div>;
    }
    // "[{"id":7,
    // "date":"2017-09-17","bedTime":"11:03:51","sleepTime":"11:03:52","sleepAttemptDuration":"00:00:04","awakeFrequency":5,"sleepDuration":"00:00:03","awakeTime":"11:03:57","outOfBedTime":"11:04:00","comment":"hekko","nap":null}]"

    const newData = this.props.diaries.map((data) => {
      return {
        date: data.date,
        bedTime: new Date(data.bedTime).getTime(),
        sleepTime: new Date(data.sleepTime).getTime(),
        awakeTime: new Date(data.awakeTime).getTime(),
        outOfBedTime: new Date(data.outOfBedTime).getTime(),
      }
    })
    // const data = [
    //     {
    //         "date": "2017-09-16",
    //         "bedTime": 102938740,
    //         "sleepTime": 1010986,
    //         "awakeTime": 1298309,
    //         "outOfBedTime": 102983089,
    //     },
    //     {
    //         "date": "2017-09-17",
    //         "bedTime": 129837489,
    //         "sleepTime": 18937809,
    //         "awakeTime": 120893509,
    //         "outOfBedTime": 1908089,
    //     }
    // ];
    const tickFormatter = (value) => {
      console.log(value);
      return moment(new Date(value)).format('MM-DD h:mm:ss a');
    }
    return (
      <LineChart width={1000} height={600} data={newData}
        margin={{ top: 5, right: 30, left: 20, bottom: 20 }}>
        <XAxis label="Date" interval="preserveStartEnd" name="Date" dataKey="date" scale="auto"/>
        <YAxis domain={['dataMin', 'dataMax']} tickFormatter={tickFormatter}/>
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Line type="monotone" name="Time went to bed" dataKey="bedTime" stroke="#ee6363" />
        <Line type="monotone" name="Time slept" dataKey="sleepTime" stroke="#ff93ac" />
        <Line type="monotone" name="Awaken time" dataKey="awakeTime" stroke="#cfce9" />
        <Line type="monotone" name="Time out of bed" dataKey="outOfBedTime" stroke="#c9c9ff" />
      </LineChart>
    );
  }
}
export default Chart
