import { useSelector } from "react-redux";
import io from "socket.io-client";

export const BASE_URL =
  window.location.hostname === "localhost" ? "http://localhost:7217" : "/api";

let socket = null;

export const getSocket = (user) => {

  if (!user?._id) return;

  if (!socket || socket.disconnected) {
    socket = io(BASE_URL, {
      query: {
        userId: user?._id
      }
    })
  }

  return socket;

}


export const disconnectSocket = () => {

  if (socket) {
    socket.disconnect();
    socket = null;
  }

}