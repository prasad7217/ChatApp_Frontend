import React, { useEffect, useState } from "react";
import { BsChatRightTextFill } from "react-icons/bs";
import { LuSearch } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import ChatPage from "./ChatPaga";
import { BASE_URL, disconnectSocket, getSocket } from "../../Constants";
import io from "socket.io-client";
import axios from "axios";
import { addUserProfile } from "../Redux/userSlices/userSlice";

const ChatArea = () => {
  const [userId, setUserId] = useState(null);
  const [newChat, setNewChat] = useState(false);
  const [targetUserLastSeenStatus, setTargetUserLastSeenStatus] = useState();
  const [userData, setUserData] = useState();

  const dispatch = useDispatch();

  const user = useSelector((store) => store.user.profile);

  useEffect(() => {

    if (!user?._id) return;

    const socket = getSocket(user);

    socket.on("success", (data) => {
      // console.log("success :", data)
      // dispatch(addUserProfile(data));
      setTargetUserLastSeenStatus(data)
    });

    socket.on("lastSeenStatus", (data) => {
      // console.log("lastSeenStatus received:", data);
      dispatch(addUserProfile(data));
      setTargetUserLastSeenStatus(data);  // ✅ now this actually works
    });

    return () => {

      // const res1 = await axios.get(BASE_URL + "/profile", {
      //   withCredentials: true,
      // });
      // if (res1?.data?.success) {
      //   dispatch(addUserProfile(res1?.data?.data));
      // }
      console.log("disconnect1")
      disconnectSocket();
      console.log("disconnect2")
    };
  }, [user?._id]);

  // const getSocket = () => {
  //   return io(BASE_URL, {
  //     query: {
  //       userId: user?._id,
  //     },
  //   });
  // };

  return (
    <div className="h-[calc(100vh-90px)] w-full bg-[#4a4a4a] overflow-hidden flex flex-col md:flex-row mt-4 md:mt-6">
      <div className="hidden md:flex md:w-[70px] bg-[#3a3a3a] items-start justify-center py-8">
        <BsChatRightTextFill className="text-center text-gray-300 text-xl" />
      </div>
      <div className="w-full md:w-[320px] lg:w-[360px] xl:w-[400px] bg-[#3a3a3a]/45 flex flex-col border-r border-[#5a5a5a]">
        <div className="w-full flex items-center justify-center p-4 sm:p-5 md:p-6">
          <div className="relative w-full">
            <LuSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 dark:text-neutral-500" />

            <input
              type="text"
              placeholder="Search anything…"
              className="w-full h-11 sm:h-12 pl-11 pr-12 text-sm rounded-full border border-neutral-200 dark:border-neutral-700 bg-[#4a4a4a] text-neutral-800 dark:text-neutral-100 placeholder:text-neutral-400 outline-none focus:border-neutral-400 dark:focus:border-neutral-500 focus:ring-2 focus:ring-violet-400/20 transition-all duration-150"
            />

            <kbd className="hidden sm:block absolute right-3.5 top-1/2 -translate-y-1/2 text-[11px] text-neutral-400 font-mono bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded px-1.5 py-0.5 pointer-events-none">
              ⌘ K
            </kbd>
          </div>
        </div>
        <div className="flex flex-col gap-1 px-2 py-2 overflow-y-auto flex-1 min-h-0">
          {user?.mutualfrds?.map((each) => {
            // console.log("each", each)
            return (
              <div
                key={each?._id}
                className="flex items-center gap-3 sm:gap-4 px-3 py-3 rounded-xl hover:bg-[#4a4a4a] transition-colors duration-150 cursor-pointer"
                onClick={() => {
                  setUserId(each);
                  // setNewChat(false)
                }}
              >
                {/* Avatar with online indicator */}
                <div className="relative flex-shrink-0">
                  <img
                    src={
                      each?.profilePic ||
                      "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
                    }
                    alt="profilePic"
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover object-center"
                  />
                  <span className="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-white dark:border-neutral-900" />
                </div>

                {/* Name & designation */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm sm:text-base font-medium text-gray-200 dark:text-neutral-100 truncate">
                    {each?.userName}
                  </p>
                  <p className="text-[11px] sm:text-xs text-neutral-400 dark:text-neutral-500 truncate">
                    {each?.designation}
                  </p>
                </div>

                {/* Connect button */}
                {/* <button className="text-xs text-neutral-500 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700 rounded-full px-3.5 py-1 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 dark:hover:bg-blue-950 dark:hover:text-blue-400 transition-colors duration-150 whitespace-nowrap flex-shrink-0">
                Connect
              </button> */}
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex-1 min-h-0 bg-[#5a5a5a]">
        <ChatPage
          mutualfrd={userId}
          targetUserLastSeenStatus={targetUserLastSeenStatus}
          newChat={newChat}
          setNewChat={setNewChat}
          userData={userData}
        />
      </div>
    </div>
  );
};

export default ChatArea;
