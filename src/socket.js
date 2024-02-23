import { io } from "socket.io-client";

export const rootSocket = io(process.env.REACT_APP_SOCKET_URL, {
  autoConnect: false,
  extraHeaders: {
    Authorization: localStorage.getItem("access_token")
      ? `Bearer ${localStorage.getItem("access_token")}`
      : "",
  },
});

export const chatSocket = io(`${process.env.REACT_APP_SOCKET_URL}/chats`, {
  autoConnect: false,
  extraHeaders: {
    Authorization: localStorage.getItem("access_token")
      ? `Bearer ${localStorage.getItem("access_token")}`
      : "",
  },
  forceNew: true,
});
