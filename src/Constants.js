import { useSelector } from "react-redux";
import io from "socket.io-client";

export const BASE_URL =
  window.location.hostname === "localhost" ? "http://localhost:7217" : "/api";

// export const getSocket = () => {
//   const user = useSelector((store) => store.user.profile);
//   console.log("constance", user);
//   return io(BASE_URL, {
//     query: {
//       userId: "",
//     },
//   });
// };
