import React, { Component } from 'react';
import io from 'socket.io-client';
import CONFIG from '../config';
import axios from '../config/axios';
import Button from '@material-ui/core/Button';
import cookie from '../utils/cookie';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import { throttle } from 'lodash';

type State = {
  messages: any[];
  input: string;
};

export default class Room extends Component<{ cache: any[] }, State> {
  private socket: SocketIOClient.Socket;

  constructor(props) {
    super(props);
    // this.styles = useStyles();
    this.state = {
      messages: [],
      input: ''
    };
    this.sendMessage = this.sendMessage.bind(this);
  }

  setTyping = throttle(() => {
    console.log('object');
    this.socket.emit('typing', '');
  }, 1000);

  sendMessage() {
    this.socket.send(this.state.input);
    this.setState({ input: '' });
  }

  login = () => {
    console.log(axios);
    axios
      .get('/verify')

      .catch(console.log);
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.cache !== this.props.cache) {
      this.setState({
        messages: this.props.cache
          .map(item => Object.defineProperty(item, 'cached', { value: true }))
          .concat(this.state.messages)
      });
    }
  }

  componentDidMount() {
    // this.setState({messages: this.props.cache})

    this.setState({
      messages: this.props.cache
        .map(item => Object.defineProperty(item, 'cached', { value: true }))
        .concat(this.state.messages)
    });

    this.socket = io(
      `${CONFIG.HOST}:${CONFIG.PORT}?token=${cookie.getCookie('token')}`
    );
    this.socket.on('message', message => {
      console.log(message);
      this.setState(prevState => ({
        messages: prevState.messages.concat(message)
      }));
      // console.log(message);
    });
    this.socket.on('disconnect', () => console.log('disconnected'));

    this.socket.on('typing', console.log);
  }

  componentWillUnmount() {
    this.socket.close();
  }

  render() {
    return (
      <div>
        {/* <ul> */}
        {this.state.messages.map((message, i) => (
          <Chip
            clickable
            label={message.content ? message.content : message}
            key={i}
          ></Chip>
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
        <Button variant="contained" color="primary" onClick={this.login}>
          登陆
        </Button>
      </div>
    );
  }
}
