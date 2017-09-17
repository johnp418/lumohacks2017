import React, { Component } from "react";
import {
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  Button
} from "react-bootstrap";
import moment from "moment";
import "rc-time-picker/assets/index.css";
import TimePicker from "rc-time-picker";
import Datetime from "react-datetime";
import "../styles/index.css";
import "../styles/react-datetime.css";

class DiaryForm extends Component {
  constructor() {
    super();
    // this.state = {
    //   napStart: "",
    //   napEnd: "",
    //   date: moment().toISOString(),
    //   bedTime: "",
    //   sleepTime: "",
    //   sleepDuration: "",
    //   sleepAttemptDuration: "",
    //   awakeTime: "",
    //   outOfBedTime: "",
    //   comment: ""
    // };
    console.log(moment().format("YYYY-MM-DD"));
    this.state = {
      nap: {
        startTime: "2017-09-17T07:00:00.000Z",
        endTime: "2017-09-18T07:00:00.000Z"
      },
      date: moment().format("YYYY-MM-DD"),
      bedTime: "2017-09-18T07:00:00.000Z",
      sleepTime: "2017-09-19T07:00:00.000Z",
      sleepDuration: "01:00:10",
      sleepAttemptDuration: "01:00:10",
      awakeTime: "2017-09-17T07:00:00.000Z",
      awakeFrequency: 5,
      outOfBedTime: "2017-09-17T07:00:00.000Z",
      comment: "yolo"
    };
  }

  onSubmit(e) {
    e.preventDefault();
    console.log("sending data ", this.state);

    const formData = Object.assign({}, this.state);
    const nap = { startTime: this.state.napStart, endTime: this.state.napEnd };
    delete formData.napStart;
    delete formData.napEnd;
    formData.nap = nap;

    fetch("http://localhost:8000/diaries", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    }).then(response => {
      console.log(response);
      if (response.status === 201) {
        console.log(" created ");
      }
    });
  }

  render() {
    return (
      <Form>
        <FormGroup>
          <ControlLabel>
            Enter the time and duration of any naps you took today
          </ControlLabel>
          Start:
          <Datetime
            className="nap-start"
            onChange={x => {
              this.setState({ napStart: x.toISOString() });
            }}
          />
          End:
          <Datetime
            className="nap-end"
            onChange={x => {
              this.setState({ napEnd: x.toISOString() });
            }}
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>
            Did you take any medication to help you sleep? If so, what did you
            take and when?
          </ControlLabel>
          <FormControl className="medication" type="text" />
        </FormGroup>
        <FormGroup>
          <ControlLabel>What time did you get into bed?</ControlLabel>
          <Datetime
            className="bedTime"
            onChange={x => this.setState({ bedTime: x.toISOString() })}
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>What time did you try to go to sleep?</ControlLabel>
          <Datetime
            className="sleepTime"
            onChange={x => this.setState({ sleepTime: x.toISOString() })}
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>
            How long did it take you to fall asleep(hh:mm:ss)?
          </ControlLabel>
          <TimePicker
            showSecond={true}
            className="sleepAttemptDuration"
            onChange={value =>
              this.setState({ sleepAttemptDuration: value.format("HH:mm:ss") })}
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>In total, how long did you sleep?</ControlLabel>
          <TimePicker
            showSecond={true}
            className="sleepDuration"
            onChange={value =>
              this.setState({ sleepDuration: value.format("HH:mm:ss") })}
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>How many times awaek?</ControlLabel>
          <FormControl
            className="awakeFrequency"
            type="number"
            onChange={e => this.setState({ awakeFrequency: e.target.value })}
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>What time was your final awakening?</ControlLabel>
          <Datetime
            className="awakeTime"
            onChange={x => this.setState({ awakeTime: x.toISOString() })}
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>
            What time did you get out of bed for the day?
          </ControlLabel>
          <Datetime
            className="outOfBedTime"
            onChange={x => this.setState({ outOfBedTime: x.toISOString() })}
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Comments (if applicable)</ControlLabel>
          <FormControl className="comments" type="text" />
        </FormGroup>
        <Button onClick={this.onSubmit.bind(this)}>Submit</Button>
      </Form>
    );
  }
}

export default DiaryForm;
