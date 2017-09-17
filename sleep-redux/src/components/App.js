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

class App extends Component {
  constructor() {
    super();

    this.state = {
      napStart: "",
      napEnd: "",
      date: moment().toISOString(),
      bedTime: "",
      sleepTime: "",
      sleepDuration: "",
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
        <Button onClick={e => console.log(this.state)}>Submit</Button>
      </Form>
    );
  }
}

export default App;
