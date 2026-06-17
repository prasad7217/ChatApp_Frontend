import React, { useEffect, useRef, useState } from "react";
import { BASE_URL, getSocket } from "../../Constants";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { PiPaperclipFill, PiVideoCameraFill } from "react-icons/pi";
import { IoMdCall } from "react-icons/io";
import { MdEmojiEmotions } from "react-icons/md";
import { IoSend } from "react-icons/io5";
import WelcomeChat from "../utils/WelcomeChat";
import EmptyChatState from "../utils/EmptyChatState";
import { formateTime12 } from "../utils/helpers";
import { addUserProfile } from "../Redux/userSlices/userSlice";
import io from "socket.io-client";

const ChatPage = ({ mutualfrd, targetUserLastSeenStatus, newChat, setNewChat, socket, userData }) => {
  const [message, setMessage] = useState("");
  const [recieveMsg, setRecieveMsg] = useState([]);

  const dispatch = useDispatch();

  const user = useSelector((store) => store.user.profile);

  const idParam = useParams();

  let targetUserId;
  // console.log("targetUserLastSeenStatus", targetUserLastSeenStatus?._id === mutualfrd?._id)
  if (idParam?.targetUserId !== ":") {
    targetUserId = idParam?.targetUserId;
  } else {
    targetUserId = mutualfrd?._id;
  }
  const bottomRef = useRef(null);

  const userId = user?._id;

  const fetchMessages = async (id) => {

    try {
      const res = await axios.post(
        BASE_URL + "/chat/" + id,
        {},
        { withCredentials: true },
      );
      // console.log("to :", res)
      if (res?.data?.success) {
        const newMsgArr = res?.data?.data?.message;
        setRecieveMsg(newMsgArr);
      }
    } catch (error) {
      if (!error?.response?.data?.success) {
        setRecieveMsg("");
      }
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [recieveMsg, targetUserLastSeenStatus, mutualfrd]);


  useEffect(() => {
    if (!userId || !targetUserId) {
      return;
    }

    fetchMessages(targetUserId);

    const socket1 = getSocket(user);

    // socket1.on("success", (data) => {
    //   console.log("success :", data)
    //   dispatch(addUserProfile(data));
    // });

    if (userId) {
      socket1.emit("joinChat", {
        userName: user?.userName,
        userId,
        targetUserId,
      });
    }

    socket1.on("recieveMessage", (data) => {
      console.log("recieveMessage2", data);
      setRecieveMsg(data?.message);
    });

    socket1.on("error", (data) => {
      console.log("error", data);
    });

    return async () => {
      socket1.off("recieveMessage"); // ✅ only remove listeners
      socket1.off("error");

      const res1 = await axios.get(BASE_URL + "/profile", {
        withCredentials: true,
      });
      if (res1?.data?.success) {
        dispatch(addUserProfile(res1?.data?.data));
      }
    };
  }, [userId, targetUserId]);


  const sendMessage = () => {
    const socket = getSocket(user);

    if (!message.trim()) return;

    socket.emit("sendMessages", {
      message,
      userName: user?.userName,
      userId,
      targetUserId,
    });
    setMessage("");
  };

  const isAboutOnline = targetUserLastSeenStatus?._id.toString() === mutualfrd?._id.toString();
  console.log("isAboutOnline :", isAboutOnline)
  const isOnline = isAboutOnline ? targetUserLastSeenStatus?.isOnline : mutualfrd?.isOnline;
  console.log("isOnline :", isOnline)
  const lastseen = isAboutOnline ? targetUserLastSeenStatus?.lastseen : mutualfrd?.lastseen;
  console.log("lastseen :", mutualfrd)
  return (
    <div className="w-full h-full flex flex-col min-h-0">
      {/* Header — fixed, doesn't grow */}
      <div className="w-full bg-[#3a3a3a] px-3 sm:px-5 md:px-8 py-2 flex items-center justify-between flex-shrink-0 border-b border-white/5">
        <div className="flex items-center gap-3 sm:gap-4 py-2 transition-colors duration-150 min-w-0">
          <div className="relative flex-shrink-0">
            <img
              src={
                mutualfrd?.profilePic
                  ? mutualfrd?.profilePic
                  : "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
              }
              alt="profilePic"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover object-center"
            />
            <span className="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm sm:text-base font-medium text-gray-200 truncate">
              {mutualfrd?.userName}
            </p>
            <p className="text-[11px] sm:text-xs text-neutral-400 truncate">
              {isOnline
                ? "online"
                : "Lastseen today at " +
                formateTime12(new Date(mutualfrd?.lastseen))}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 sm:gap-6 md:gap-8 flex-shrink-0">
          <PiVideoCameraFill className="text-[20px] sm:text-[24px] text-gray-300 cursor-pointer" />
          <IoMdCall className="text-[20px] sm:text-[24px] text-gray-300 cursor-pointer" />
        </div>
      </div>

      {/* ✅ Messages area — flex-1 fills all remaining space */}
      <div className="flex-1 min-h-0 w-full">
        {recieveMsg?.length > 0 ? (
          // ✅ h-full + overflow-y-auto works now because parent has real height via flex-1
          <div className="h-full overflow-y-auto text-white flex flex-col gap-3 sm:gap-4 chatArea px-3 sm:px-6 md:px-10 lg:px-16 py-3 sm:py-4">
            <div className="flex-1" />
            {recieveMsg?.map((each) => {
              return (
                <div
                  key={each?._id}
                  className={`flex items-end gap-1.5 sm:gap-2 ${each?.senderId?._id?.toString() === userId?.toString()
                    ? "flex-row-reverse"
                    : "flex-row"
                    }`}
                >
                  <div className="shrink-0">
                    <img
                      alt="avatar"
                      src={`${each?.senderId?.profilePic ? each?.senderId?.profilePic : "https://img.daisyui.com/images/profile/demo/kenobee@192.webp"}`}
                      className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover"
                    />
                  </div>
                  <div
                    className={`flex flex-col gap-1 max-w-[85%] sm:max-w-[75%] lg:max-w-[65%] ${each?.senderId?._id.toString() === userId.toString()
                      ? "items-end"
                      : "items-start"
                      }`}
                  >
                    <div className="flex items-center gap-1.5 px-1">
                      <span className="text-[11px] sm:text-xs font-medium text-neutral-300">
                        {each?.senderId?.userName}
                      </span>
                    </div>
                    <div
                      className={`px-3 sm:px-2 py-1 rounded-2xl text-xs sm:text-[16px] leading-relaxed break-words flex gap-2 ${each?.senderId?._id.toString() === userId.toString()
                        ? "bg-red-600 text-white rounded-br-none"
                        : "bg-[#484848] text-neutral-200 rounded-bl-none border border-white/[0.07]"
                        }`}
                    >
                      <p className="">{each?.text}</p>
                      <time className="text-[11px] sm:text-[12px] text-gray-300 flex items-end justify-end pt-3">
                        {formateTime12(new Date(each?.createdAt))}
                      </time>
                    </div>
                    <div className="text-[9px] sm:text-[10px] text-neutral-500 px-1">
                      Delivered
                    </div>
                  </div>
                </div>
              );
            })}
            {/* ✅ Auto-scroll anchor */}
            <div ref={bottomRef} />
          </div>
        ) : (
          <WelcomeChat />
        )}
      </div>

      {/* Input bar — fixed, doesn't grow */}
      <div className="flex-shrink-0 flex items-center justify-center gap-2 px-2 sm:px-4 py-2 bg-[#2e2e2e] border-t border-white/5">
        <div className="flex items-center gap-1 sm:gap-2 w-full max-w-4xl bg-[#3a3a3a] border border-white/10 rounded-full px-2 sm:px-3 py-2">
          <button
            aria-label="Attach file"
            className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full text-neutral-400 hover:bg-white/10 hover:text-neutral-200 transition-all duration-150 flex-shrink-0"
          >
            <PiPaperclipFill className="text-[20px] sm:text-[24px]" />
          </button>
          <input
            type="text"
            placeholder="Type a message…"
            value={message}
            className="flex-1 bg-transparent text-xs sm:text-sm text-neutral-200 placeholder:text-neutral-500 outline-none px-1 min-w-0"
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            aria-label="Emoji"
            className="flex items-center justify-center w-8 h-8 rounded-full text-neutral-400 hover:bg-white/10 hover:text-neutral-200 transition-all duration-150 flex-shrink-0"
          >
            <MdEmojiEmotions className="text-[18px] sm:text-[20px]" />
          </button>
          <button
            aria-label="Send"
            className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-red-600 hover:bg-red-500 active:scale-95 transition-all duration-150 flex-shrink-0"
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
