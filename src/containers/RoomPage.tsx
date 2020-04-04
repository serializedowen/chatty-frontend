import React, { Component, useState, useEffect, useCallback } from "react";

import axios from "../config/axios";
import Badge from "@material-ui/core/Badge";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";

import Room from "../components/Room";

import CreateRoomDialog from "../components/CreateRoomDialog";
import MessageCache from "../hoc/MessageCache";
import socket from "src/services/socket";
import { Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: 500
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`
  }
}));

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
};

function TabPanel(props: { children: JSX.Element }) {
  const { children } = props;

  return (
    <Typography component="div" role="tabpanel">
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

function RoomPage() {
  const [activeRoom, setactiveRoom] = useState<RoomModel>({});
  const [rooms, setrooms] = useState<RoomModel[]>([]);

  const addRoomCallback = useCallback(
    (room: RoomModel) => {
      setrooms(rooms.concat(room));
    },
    [rooms]
  );

  useEffect(() => {
    socket.socket && socket.socket.on("create", addRoomCallback);
    axios.get("/api/room").then(res => setrooms(res.data as RoomModel[]));

    return () => {
      socket.socket && socket.socket.off("create", addRoomCallback);
    };
  }, []);

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Tabs value={activeRoom.id} orientation="vertical">
        {rooms &&
          rooms.map(room => (
            <Tab
              value={room.id}
              key={room.id}
              onClick={() => setactiveRoom(room)}
              label={
                <Badge color="secondary" badgeContent={4}>
                  {room.name}
                </Badge>
              }
            />
          ))}
      </Tabs>

      <CreateRoomDialog></CreateRoomDialog>
      {/* <TabPanel ></TabPanel> */}
      <TabPanel>
        <MessageCache
          roomId={activeRoom.hashId}
          component={(cachedMessage: any[]) => (
            <Room key={activeRoom.hashId} cache={cachedMessage} />
          )}
        ></MessageCache>
      </TabPanel>
    </div>
  );
}
// export class RoomPage extends Component<{}, State> {
//   constructor(props: any) {
//     super(props);
//     this.state = {
//       activeRoom: {},
//       rooms: []
//     };

//     this.addRoomCallback = this.addRoomCallback.bind(this);
//   }

//   addRoomCallback(room: RoomModel) {
//     this.setState({ rooms: this.state.rooms.concat(room) });
//   }

//   componentDidMount() {
//     this.classes = useStyles();

//     socket.socket && socket.socket.on("create", this.addRoomCallback);

//     axios.get("/api/room").then(res => {
//       this.setState({ rooms: res.data });
//     });
//   }

//   componentWillUnmount() {
//     socket.socket && socket.socket.off("create", this.addRoomCallback);
//   }

//   render() {
//     let { activeRoom, rooms } = this.state;
//     let { classes } = this;

//     return (
//       <div className={classes.root}>
//         <Tabs value={activeRoom.id} orientation="vertical">
//           {rooms &&
//             rooms.map(room => (
//               <Tab
//                 value={room.id}
//                 key={room.id}
//                 onClick={() => this.setState({ activeRoom: room })}
//                 label={
//                   <Badge color="secondary" badgeContent={4}>
//                     {room.name}
//                   </Badge>
//                 }
//               />
//             ))}
//         </Tabs>

//         <CreateRoomDialog></CreateRoomDialog>
//         {/* <TabPanel ></TabPanel> */}
//         <TabPanel>
//           <MessageCache
//             roomId={activeRoom.hashId}
//             component={(cachedMessage: any[]) => (
//               <Room key={activeRoom.hashId} cache={cachedMessage} />
//             )}
//           ></MessageCache>
//         </TabPanel>
//       </div>
//     );
//   }
// }

export default RoomPage;
