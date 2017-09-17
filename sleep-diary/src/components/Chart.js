import React, { Component } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
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

    const newData = this.props.diaries.map((data) => {
      let bedDate = data.date + "T00:00";
      return {
        date: data.date,
        bedTime: new Date(data.bedTime.substring(0,16)).getTime() - new Date(bedDate).getTime(),
        sleepTime: new Date(data.sleepTime.substring(0,16)).getTime() - new Date(bedDate).getTime(),
        awakeTime: new Date(data.awakeTime.substring(0,16)).getTime() - new Date(bedDate).getTime(),
        outOfBedTime: new Date(data.outOfBedTime.substring(0,16)).getTime() - new Date(bedDate).getTime(),
      }
    })
    
    console.log(newData);
    const tickFormatter = (value) => {
      return moment(new Date(value)).format('h:mm a');
    }
    return (
      <div className="col-6">
      <ResponsiveContainer width="100%" height="50%">
      <LineChart data={newData}
        margin={{ top: 5, right: 30, left: 20, bottom: 20 }}>
        <XAxis label="Date" interval="preserveStartEnd" name="Date" dataKey="date" padding={{ left: 50, right: 50 }}/>
        <YAxis type="number" domain={[54000000, 86400000]} padding={{ top: 50, bottom: 50 }} tickFormatter={tickFormatter}/>
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend verticalAlign="top"/>
        <Line type="monotone" name="Time went to bed" dataKey="bedTime" stroke="#ee6363" />
        <Line type="monotone" name="Time slept" dataKey="sleepTime" stroke="#ff93ac" />
        <Line type="monotone" name="Awaken time" dataKey="awakeTime" stroke="#BAE1FF" />
        <Line type="monotone" name="Time out of bed" dataKey="outOfBedTime" stroke="#89a6d4" />
      </LineChart>
      </ResponsiveContainer>
      </div>
    );
  }
}
export default Chart
