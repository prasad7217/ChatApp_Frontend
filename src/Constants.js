import io from "socket.io-client";
console.log(window.location)
export const BASE_URL = window.location.hostname === "localhost" 
  ? "http://localhost:7217" 
  : "/api";

let socketInstance = null; //

export const getSocket = () => {
  if (!socketInstance) {
    socketInstance = io(BASE_URL); 
  }
  return socketInstance; 
}