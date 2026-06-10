import React, { useEffect, useState } from "react";
import { BASE_URL, getSocket } from "../../Constants";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";

const ChatPage = () => {
  const [message, setMessage] = useState("");
  const [recieveMsg, setRecieveMsg] = useState([]);

  const user = useSelector((store) => store.user.profile);
  const { targetUserId } = useParams();

  const userId = user?._id;

  const fetchMessages = async (id) => {

    try {

      const res = await axios.post(BASE_URL + "/chat/" + id, {}, { withCredentials: true })

      if (res?.data?.success) {

        const newMsgArr = res?.data?.data?.message;

        setRecieveMsg(newMsgArr)

      }
    } catch (error) {
      console.log("Error:", error)
    }

  }

  useEffect(() => {

    if (!userId || !targetUserId) {
      return;
    }

    fetchMessages(targetUserId);

    const socket = getSocket();

    if (userId) {
      socket.emit("joinChat", {
        userName: user?.userName,
        userId,
        targetUserId,
      });
    }

    socket.on("recieveMessage", (data) => {
      setRecieveMsg(data?.message)
    });

    socket.on("error", (data) => {
      console.log("error", data)
    })

    return () => {
      socket.off("recieveMessage"); // ✅ only remove listeners
      socket.off("error");
    }

  }, [userId, targetUserId]);

  const sendMessage = () => {
    const socket = getSocket();

    if (!message.trim()) return;

    socket.emit("sendMessages", {
      message,
      userName: user?.userName,
      userId,
      targetUserId,
    });
  };

  return (
    <div className="w-full sm:min-h-[83vh] bg-[#4a4a4a] mt-6 flex items-center justify-center">
      <div className="h-[500px] w-[450px] border border-gray-200">
        <div className="h-[15%] bg-[#3a3a3a]">
          <p className="text-white">{targetUserId}</p>
        </div>
        <div className="h-[78%] text-white">
          {recieveMsg?.map((each, id) => {
            // console.log("each", each)
            return (
              <p key={id}>{each?.text}</p>
            )})
            
            }
        </div>
        <div className="flex items-center justify-center gap-2 px-4">
          <input
            type="text"
            placeholder="type"
            className="bg-[#3a3a3a]/50 w-full py-1 px-4 text-gray-300"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="text-white bg-red-600" onClick={sendMessage}>
            send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
