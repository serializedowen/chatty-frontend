import React, { Component } from "react";

import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import TextField from "@material-ui/core/TextField";
import { throttle } from "lodash";
import socket from "src/services/socket";

type State = {
  messages: any[];
  input: string;
};

type Props = { cache: any[] };

export default class Room extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    // this.styles = useStyles();
    this.state = {
      messages: [],
      input: ""
    };
    this.sendMessage = this.sendMessage.bind(this);
    this.setMessage = this.setMessage.bind(this);
  }

  setTyping = throttle(() => {
    socket.socket.emit("typing", "");
  }, 1000);

  sendMessage() {
    socket.socket.send(this.state.input);
    this.setState({ input: "" });
  }

  setMessage(message: any) {
    this.setState(prevState => ({
      messages: prevState.messages.concat(message)
    }));
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (prevProps.cache !== this.props.cache) {
      this.setState({
        messages: this.props.cache
          .map(item => Object.defineProperty(item, "cached", { value: true }))
          .concat(this.state.messages)
      });
    }
  }

  componentDidMount() {
    this.setState({
      messages: this.props.cache
        .map(item => Object.defineProperty(item, "cached", { value: true }))
        .concat(this.state.messages)
    });

    socket.socket.on("message", this.setMessage);
    socket.socket.on("disconnect", () => console.log("disconnected"));
  }

  componentWillUnmount() {
    socket.socket.off("message", this.setMessage);
  }

  render() {
    return (
      <div>
        {/* <ul> */}
        {this.state.messages.map((message, i) => (
          <div>
            <Chip
              clickable
              label={
                message.content && message.createdAt ? message.content : null
              }
              key={i}
            ></Chip>
          </div>
        ))}
        {/* </ul> */}

        <TextField
          id="standard-name"
          placeholder="Placeholder"
          name="input"
          label="With placeholder"
          // className={styles.textField}
          value={this.state.input}
          onKeyDown={e => {
            if (13 === e.keyCode) {
              this.sendMessage();
            }
          }}
          onChange={e => {
            this.setTyping();

            //@ts-ignore
            this.setState({ [e.target.name]: e.target.value });
          }}
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={this.sendMessage}>
          发送
        </Button>
      </div>
    );
  }
}
