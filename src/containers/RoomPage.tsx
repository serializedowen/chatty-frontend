import React, { Component } from 'react';
import CONFIG from '../config';
import io from 'socket.io-client';
import cookie from '../utils/cookie';
import axios from '../config/axios';
import Badge from '@material-ui/core/Badge';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Room from '../components/Room';
import CreateRoomDialog from '../components/CreateRoomDialog';
import MessageCache from '../hoc/MessageCache.js';

// import { RoomAttributes } from '../../../../../server/db/sequelize/models/Room';

type RoomModel = {
  id?: number;
  createdAt?: string;
  updatedAt?: string;
  hashId?: string;
  name?: string;
};

type State = {
  activeRoom: RoomModel;
  rooms: RoomModel[];
  inRooms: RoomModel[];
};

export class RoomPage extends Component<{}, State> {
  private socket: SocketIOClient.Socket;

  constructor(props: any) {
    super(props);
    this.state = {
      activeRoom: {},
      rooms: [],
      inRooms: []
    };
  }

  componentDidMount() {
    this.socket = io(
      `${CONFIG.HOST}:${CONFIG.PORT}?token=${cookie.getCookie('token')}`
    );
    this.socket.on('create', (room: RoomModel) => {
      return this.setState({ rooms: this.state.rooms.concat(room) });
    });

    axios.get('/api/room').then(res => {
      this.setState({ rooms: res.data });
    });
  }

  componentWillUnmount() {
    this.socket.close();
  }

  render() {
    let { activeRoom, rooms } = this.state;
    return (
      <div>
        <Tabs value={activeRoom.id}>
          {rooms &&
            rooms.map(room => (
              <Tab
                value={room.id}
                key={room.id}
                onClick={() => this.setState({ activeRoom: room })}
                label={
                  <Badge color="secondary" badgeContent={4}>
                    {room.name}
                  </Badge>
                }
              />
            ))}
        </Tabs>

        <Tabs value={activeRoom.id}>
          {rooms &&
            rooms.map(room => (
              <Tab
                value={room.id}
                key={room.id}
                onClick={() =>
                  axios.post('/api/my/join-room', { name: room.name })
                }
                label={
                  <Badge color="secondary" badgeContent={4}>
                    Leave {room.name} ?
                  </Badge>
                }
              />
            ))}
        </Tabs>
        <Tabs value={activeRoom.id}>
          {rooms &&
            rooms.map(room => (
              <Tab
                value={room.id}
                key={room.id}
                onClick={() =>
                  axios.post('/api/my/leave-room', { name: room.name })
                }
                label={
                  <Badge color="secondary" badgeContent={4}>
                    Join {room.name} ?
                  </Badge>
                }
              />
            ))}
        </Tabs>
        <CreateRoomDialog></CreateRoomDialog>

        <MessageCache
          roomId={activeRoom.hashId}
          component={cachedMessage => (
            <Room key={activeRoom.hashId} cache={cachedMessage} />
          )}
        ></MessageCache>
      </div>
    );
  }
}

export default RoomPage;
