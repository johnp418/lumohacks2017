import React, { Component } from "react";
import { Form, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "../styles/index.css";

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
      <Form inline>
        <FormGroup>
          <ControlLabel>
            Enter the time and duration of any naps you took today
          </ControlLabel>
          <FormControl type="text" />
        </FormGroup>
        <FormGroup>
          <ControlLabel>
            Did you take any medication to help you sleep? If so, what did you
            take and when?
          </ControlLabel>
          <FormControl type="text" />
        </FormGroup>
        <FormGroup>
          <ControlLabel>What time did you get into bed?</ControlLabel>
          <FormControl type="text" />
        </FormGroup>
        <FormGroup>
          <ControlLabel>What time did you try to go to sleep?</ControlLabel>
          <FormControl type="text" />
        </FormGroup>
        <FormGroup>
          <ControlLabel>How long did it take you to fall asleep?</ControlLabel>
          <FormControl type="text" />
        </FormGroup>
        <FormGroup>
          <ControlLabel>In total, how long did you sleep?</ControlLabel>
          <FormControl type="text" />
        </FormGroup>
        <FormGroup>
          <ControlLabel>What time was your final awakening?</ControlLabel>
          <FormControl type="text" />
        </FormGroup>
        <FormGroup>
          <ControlLabel>What time did you get out of bed for the day?</ControlLabel>
          <FormControl type="text" />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Comments (if applicable)</ControlLabel>
          <FormControl type="text" />
        </FormGroup>

      </Form>
    );
  }
}

export default App;
