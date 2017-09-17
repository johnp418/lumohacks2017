import React, { Component } from "react";
import { Form, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

import moment from "moment";
import 'rc-time-picker/assets/index.css';
import TimePicker from "rc-time-picker";

import "../styles/index.css";
import "../styles/react-datetime.css";

class App extends Component {
  constructor() {
    super();

    this.state = {
      nap: "",
      date: "",
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
            defaultValue={moment()}
            className="nap-start"
          />
          End
          <TimePicker
            showSecond={true}
            defaultValue={moment()}
            className="nap-end"
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
              defaultValue={moment()}
              className="bedTime"
            />
        </FormGroup>
        <FormGroup>
          <ControlLabel>What time did you try to go to sleep?</ControlLabel>
            <TimePicker
              showSecond={true}
              defaultValue={moment()}
              className="sleepTime"
            />
        </FormGroup>
        <FormGroup>
          <ControlLabel>How long did it take you to fall asleep?</ControlLabel>
            <TimePicker
              showSecond={true}
              defaultValue={moment()}
              className="sleepAttemptDuration"
            />
        </FormGroup>
        <FormGroup>
          <ControlLabel>In total, how long did you sleep?</ControlLabel>
            <TimePicker
              showSecond={true}
              defaultValue={moment()}
              className="sleepDuration"
            />
        </FormGroup>
        <FormGroup>
          <ControlLabel>What time was your final awakening?</ControlLabel>
            <TimePicker
              showSecond={true}
              defaultValue={moment()}
              className="awakeTime"
            />
        </FormGroup>
        <FormGroup>
          <ControlLabel>
            What time did you get out of bed for the day?
          </ControlLabel>
          <TimePicker
            showSecond={true}
            defaultValue={moment()}
            className="outOfBedTime"
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Comments (if applicable)</ControlLabel>
          <FormControl className="comments" type="text" />
        </FormGroup>
      </Form>
    );
  }
}

export default App;
