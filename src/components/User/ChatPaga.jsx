import React, { useEffect } from "react";
import { getSocket } from "../../Constants";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ChatPage = () => {
    
  const user = useSelector((store) => store.user.profile);
  const {targetUserId} = useParams();

  const userId = user?._id;

  useEffect(() => {
    const socket = getSocket();

    if (userId) {
      socket.emit("joinChat", { userName: user?.userName, userId, targetUserId });
    }
  }, [user]);

  return <div className="w-full sm:min-h-[83vh] bg-[#4a4a4a]"></div>;
};

export default ChatPage;
