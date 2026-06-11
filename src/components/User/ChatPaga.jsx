import React, { useEffect, useState } from "react";
import { BASE_URL, getSocket } from "../../Constants";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { PiPaperclipFill, PiVideoCameraFill } from "react-icons/pi";
import { IoMdCall } from "react-icons/io";
import { MdEmojiEmotions } from "react-icons/md";
import { IoSend } from "react-icons/io5";

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
  console.log(recieveMsg)
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
    <div className="w-full sm:h-[83vh]">
      <div className="w-full 3xl:h-[10%] sm:h-[9%] bg-[#3a3a3a] px-10 flex items-center justify-between">
        <div
          className="flex items-center gap-5 px-3 py-3.5 hover:bg-[#4a4a4a] dark:hover:bg-neutral-800 transition-colors duration-150"
        >
          {/* Avatar with online indicator */}
          <div className="relative flex-shrink-0">
            <img
              src={"https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"}
              alt="profilePic"
              className="w-11 h-11 rounded-full object-cover object-center"
            />
            <span className="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-white dark:border-neutral-900" />
          </div>

          {/* Name & designation */}
          <div className="flex-1 min-w-0">
            <p className="text-md font-medium text-gray-200 dark:text-neutral-100 truncate">
              Username
            </p>
            <p className="text-xs text-neutral-400 dark:text-neutral-500 truncate">
              designation
            </p>
          </div>

          {/* Connect button */}
          {/* <button className="text-xs text-neutral-500 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700 rounded-full px-3.5 py-1 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 dark:hover:bg-blue-950 dark:hover:text-blue-400 transition-colors duration-150 whitespace-nowrap flex-shrink-0">
                Connect
              </button> */}
        </div>
        <div className="flex items-center justify-between gap-12">
          <PiVideoCameraFill className="text-[25px] text-gray-300" />
          <IoMdCall className="text-[25px] text-gray-300" />
        </div>
      </div>
      <div className="3xl:h-[80%] sm:h-[90%] w-full">
        <div className=" bg-[#3a3a3a]">
          <p className="text-white">{targetUserId}</p>
        </div>
        <div className="h-[78%] text-white flex flex-col gap-4 overflow-y-auto chatArea px-4 py-3">
          {recieveMsg?.map((each, id) => {
            // console.log("each", each)
            return (
              <p key={id} className={`${each?.senderId === userId ? "text-end" : ""}`}>{each?.text}</p>
            )
          })

          }
        </div>

      </div>
      <div className="flex items-center justify-center gap-2 px-4 py-3 bg-[#2e2e2e] border-t border-white/5">
        <div className="flex items-center gap-2 w-full max-w-2xl bg-[#3a3a3a] border border-white/10 rounded-full px-3 py-2">

          {/* Attach button */}
          <button
            aria-label="Attach file"
            className="flex items-center justify-center w-8 h-8 rounded-full text-neutral-400 hover:bg-white/10 hover:text-neutral-200 transition-all duration-150 flex-shrink-0"
          >
            <PiPaperclipFill className="text-[25px]" />
          </button>

          {/* Input */}
          <input
            type="text"
            placeholder="Type a message…"
            className="flex-1 bg-transparent text-sm text-neutral-200 placeholder:text-neutral-500 outline-none px-1"
          />

          {/* Emoji button */}
          <button
            aria-label="Emoji"
            className="flex items-center justify-center w-8 h-8 rounded-full text-neutral-400 hover:bg-white/10 hover:text-neutral-200 transition-all duration-150 flex-shrink-0"
          >
            <MdEmojiEmotions className="text-[25px]" />
          </button>

          {/* Send button */}
          <button
            aria-label="Send"
            className="flex items-center justify-center w-9 h-9 rounded-full bg-red-600 hover:bg-red-500 active:scale-95 transition-all duration-150 flex-shrink-0"
          >
            <IoSend className="text-[16px] text-white" />
          </button>

        </div>
      </div>
    </div>
  );
};

export default ChatPage;
