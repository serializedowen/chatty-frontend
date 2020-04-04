import { Subject, Observable } from "rxjs";

import CONFIG from "src/config";
import cookie from "src/utils/cookie";
import io from "socket.io-client";

export const connectSocketSubject = new Subject();
export const disconnectSocketSubject = new Subject();

type Socket = {
  socket: SocketIOClient.Socket;
};

const socket: Socket = {
  socket: null
};

export const socketFactory = (token: string, namespace: string = "") =>
  io(`${CONFIG.HOST}:${CONFIG.PORT}/${namespace}?token=${token}`);

connectSocketSubject.subscribe(
  () => (socket.socket = socketFactory(cookie.getCookie("chattytoken")))
);

disconnectSocketSubject.subscribe(() => {
  socket.socket.close();
  socket.socket = null;
});

export default socket;
