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

import "../styles/index.css";
import "../styles/react-datetime.css";

class App extends Component {
  constructor() {
    super();

    this.state = {
      napStart: "",
      napEnd: "",
      date: moment().format("L"),
      bedTime: "",
      sleepTime: "",
      sleepAttemptDuration: "",
      awakeTime: "",
      outOfBedTime: "",
      comment: ""
    };
  }

  render() {
    return (
      <Form>
        <FormGroup>
          <ControlLabel>
            Enter the time and duration of any naps you took today
          </ControlLabel>
          Start:
          <TimePicker
            showSecond={true}
            className="nap-start"
            onChange={value =>
              this.setState({ napStart: value.format("HH:mm:ss") })}
          />
          End
          <TimePicker
            showSecond={true}
            className="nap-end"
            onChange={value =>
              this.setState({ napEnd: value.format("HH:mm:ss") })}
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
          <TimePicker
            showSecond={true}
            className="bedTime"
            onChange={value =>
              this.setState({ bedTime: value.format("HH:mm:ss") })}
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>What time did you try to go to sleep?</ControlLabel>
          <TimePicker
            showSecond={true}
            className="sleepTime"
            onChange={value =>
              this.setState({ sleepTime: value.format("HH:mm:ss") })}
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>How long did it take you to fall asleep?</ControlLabel>
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
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>What time was your final awakening?</ControlLabel>
          <TimePicker
            showSecond={true}
            className="awakeTime"
            onChange={value =>
              this.setState({ awakeTime: value.format("HH:mm:ss") })}
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>
            What time did you get out of bed for the day?
          </ControlLabel>
          <TimePicker
            showSecond={true}
            className="outOfBedTime"
            onChange={value =>
              this.setState({ outOfBedTime: value.format("HH:mm:ss") })}
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Comments (if applicable)</ControlLabel>
          <FormControl className="comments" type="text" />
        </FormGroup>
        <Button onClick={e => console.log(this.state)}>Submit</Button>
      </Form>
    );
  }
}

export default App;
