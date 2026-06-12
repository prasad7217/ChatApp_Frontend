import React, { useState } from "react";
import { BsChatRightTextFill } from "react-icons/bs";
import { LuSearch } from "react-icons/lu";
import { useSelector } from "react-redux";
import ChatPage from "./ChatPaga";

const ChatArea = () => {

  const [userId, setUserId] = useState(null);
  const user = useSelector(store => store.user.profile);

  return (
    <div className="sm:h-[84vh] 3xl:h-[86vh] w-full bg-[#4a4a4a] pt-6 flex">
      <div className="3xl:w-[4%] 3xl:min-h-full bg-[#3a3a3a] flex justify-center py-10">
        <BsChatRightTextFill className="text-center text-gray-300" />
      </div>
      <div className="3xl:w-[25%] bg-[#3a3a3a]/45 3xl:min-h-full">
        <div className="w-full flex items-center justify-center py-10 px-4">
          <div className="relative w-full max-w-lg">

            <LuSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 dark:text-neutral-500" />

            <input
              type="text"
              placeholder="Search anything…"
              className="w-full h-12 pl-11 pr-16 text-sm rounded-full border border-neutral-200 dark:border-neutral-700 bg-[#4a4a4a] dark:bg-neutral-900 text-neutral-800 dark:text-neutral-100 placeholder:text-neutral-400 outline-none focus:border-neutral-400 dark:focus:border-neutral-500 focus:ring-2 focus:ring-violet-400/20 transition-all duration-150"
            />

            <kbd className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[11px] text-neutral-400 font-mono bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded px-1.5 py-0.5 pointer-events-none">
              ⌘ K
            </kbd>

          </div>
        </div>
        <div className="flex flex-col gap-0.5 px-2 py-2 overflow-y-auto max-h-[420px]">
          {user?.mutualfrds?.map((each) => (
            <div
              key={each?._id}
              className="flex items-center gap-5 px-3 py-2.5 hover:bg-[#4a4a4a] dark:hover:bg-neutral-800 transition-colors duration-150"
              onClick={() => setUserId(each?._id)}
            >
              {/* Avatar with online indicator */}
              <div className="relative flex-shrink-0">
                <img
                  src={each?.profilePic || "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"}
                  alt="profilePic"
                  className="w-11 h-11 rounded-full object-cover object-center"
                />
                <span className="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-white dark:border-neutral-900" />
              </div>

              {/* Name & designation */}
              <div className="flex-1 min-w-0">
                <p className="text-md font-medium text-gray-200 dark:text-neutral-100 truncate">
                  {each?.userName}
                </p>
                <p className="text-xs text-neutral-400 dark:text-neutral-500 truncate">
                  {each?.designation}
                </p>
              </div>

              {/* Connect button */}
              {/* <button className="text-xs text-neutral-500 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700 rounded-full px-3.5 py-1 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 dark:hover:bg-blue-950 dark:hover:text-blue-400 transition-colors duration-150 whitespace-nowrap flex-shrink-0">
                Connect
              </button> */}
            </div>
          ))}
        </div>
      </div>
      <div className="sm:w-[71%] 3xl:w-[71%] sm:min-h-full 3xl:min-h-full bg-[#5a5a5a]">
        <ChatPage chatUserId={userId}/>
      </div>
    </div>
  )
}

export default ChatArea;