import io from "socket.io-client";

export const BASE_URL = window.location.hostname === "localhost" 
  ? "http://localhost:7217" 
  : "/api";

let socketInstance = null; // ✅ you already had this variable, just uncommment!

export const getSocket = () => {
  if (!socketInstance) {
    socketInstance = io(BASE_URL); // ✅ only creates socket ONCE
  }
  return socketInstance; // ✅ always returns same socket
}