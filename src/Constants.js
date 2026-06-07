import io from "socket.io-client";

//In production

// export const BASE_URL = "/api"

//In localhost 
export const BASE_URL = window.location.hostname === "localhost" ? "http://localhost:7217" : "/api";

export const getSocket = () =>{

    return io(BASE_URL);

}