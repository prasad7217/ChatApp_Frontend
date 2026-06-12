import React, { useEffect, useState } from "react";
import { BASE_URL, getSocket } from "../../Constants";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { PiPaperclipFill, PiVideoCameraFill } from "react-icons/pi";
import { IoMdCall } from "react-icons/io";
import { MdEmojiEmotions } from "react-icons/md";
import { IoSend } from "react-icons/io5";
import WelcomeChat from "../utils/WelcomeChat";
import EmptyChatState from "../utils/EmptyChatState";

const ChatPage = ({ chatUserId, newChat, setNewChat }) => {

  const [message, setMessage] = useState("");
  const [recieveMsg, setRecieveMsg] = useState([]);

  const user = useSelector((store) => store.user.profile);
  const idParam = useParams();

  let targetUserId;

  if (idParam?.targetUserId !== ":") {
    targetUserId = idParam?.targetUserId;
  } else {
    targetUserId = chatUserId;
  }

  const userId = user?._id;

  const fetchMessages = async (id) => {
    console.log("to :", id)
    try {

      const res = await axios.post(BASE_URL + "/chat/" + id, {}, { withCredentials: true })
      // console.log("to :", res)
      if (res?.data?.success) {
        const newMsgArr = res?.data?.data?.message;
        setRecieveMsg(newMsgArr)
      }
    } catch (error) {
      if (!error?.response?.data?.success) {
        setRecieveMsg("")
      }

    }

  }
  // console.log(recieveMsg)
  useEffect(() => {
    console.log("efeet before", targetUserId)
    if (!userId || !targetUserId) {
      return;
    }
    console.log("efeet after", targetUserId)
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
      console.log("recieveMessage", data)
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
  // console.log("init :", targetUserId)
  const sendMessage = () => {
    const socket = getSocket();

    if (!message.trim()) return;

    socket.emit("sendMessages", {
      message,
      userName: user?.userName,
      userId,
      targetUserId,
    });
    setMessage("")
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

        {recieveMsg.length > 0 ? <div className="h-[78%] text-white flex flex-col gap-4 overflow-y-auto chatArea px-4 py-3">
          {recieveMsg?.map((each, id) => {
            console.log("each", each?.senderId?._id.toString() === userId.toString())
            return (
              <div
                key={each?.id}
                className={`flex items-end gap-2 ${each?.senderId?._id.toString() === userId.toString() ? "flex-row-reverse" : "flex-row"}`}
              >
                {/* Avatar */}
                <div className="shrink-0">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
                    className="w-9 h-9 rounded-full object-cover"
                  />
                </div>

                <div className={`flex flex-col gap-1 max-w-[65%] ${each?.senderId?._id.toString() === userId.toString() ? "items-end" : "items-start"}`}>

                  {/* Header */}
                  <div className="flex items-center gap-1.5 px-1">
                    <span className="text-xs font-medium text-neutral-300">Obi-Wan Kenobi</span>
                    <time className="text-[10px] text-neutral-500">12:45</time>
                  </div>

                  {/* Bubble */}
                  <div className={`px-4 py-2 rounded-2xl text-sm leading-relaxed break-words
      ${each?.senderId?._id.toString() === userId.toString()
                      ? "bg-red-600 text-white rounded-br-sm"
                      : "bg-[#484848] text-neutral-200 rounded-bl-sm border border-white/[0.07]"
                    }`}
                  >
                    {each?.text}
                  </div>

                  {/* Footer */}
                  <div className="text-[10px] text-neutral-500 px-1">Delivered</div>

                </div>
              </div>
            )
          })

          }
        </div> : <WelcomeChat />}

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
            value={message}
            className="flex-1 bg-transparent text-sm text-neutral-200 placeholder:text-neutral-500 outline-none px-1"
            onChange={(e) => setMessage(e.target.value)}
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
            onClick={sendMessage}
          >
            <IoSend className="text-[16px] text-white" />
          </button>

        </div>
      </div>
    </div>
  );
};

export default ChatPage;
