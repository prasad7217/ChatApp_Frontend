// components/FollowersModal.jsx
import { useState } from "react";
import { IoClose } from "react-icons/io5";

export default function FollowersModal({ user, state, close }) {
  console.log("user profiles :", user, close, state)
  // const [activeTab, setActiveTab] = useState("followers");

  // const list = activeTab === "followers" ? followers : following;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <div className="bg-gray-800/75 rounded-2xl w-80 min-h-[400px] max-h-[480px] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}>
        <div className="w-full bg-gray-700 px-4 py-2 flex items-center justify-between">
          <p className="text-gray-200">{state === "followers" ? "Followers" : "Following"}</p>
          <IoClose className="text-gray-300 text-[25px] cursor-pointer hover:bg-gray-600 rounded-full p-1" onClick={() => close(false)}/>
        </div>

        {/* Header */}
        {/* <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab("followers")}
              className={`text-sm font-medium pb-1 border-b-2 transition-all ${
                activeTab === "followers"
                  ? "text-white border-white"
                  : "text-gray-400 border-transparent"
              }`}>
              Followers
            </button>
            <button
              onClick={() => setActiveTab("following")}
              className={`text-sm font-medium pb-1 border-b-2 transition-all ${
                activeTab === "following"
                  ? "text-white border-white"
                  : "text-gray-400 border-transparent"
              }`}>
              Following
            </button>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white">✕</button>
        </div> */}

        {/* List */}
        <div className="overflow-y-auto flex-1">
          { state === "following" ? user?.following?.map((user) => (
            <div key={user._id} className="flex items-center gap-3 px-4 py-2.5 hover:bg-white/5">
              <img
                src={user.profilePic}
                className="w-10 h-10 rounded-full object-cover"
                alt={user.userName}
              />
              <div className="flex-1">
                <p className="text-sm font-medium text-white">{user.userName}</p>
                <p className="text-xs text-gray-400">{user.designation}</p>
              </div>
              <button className="text-xs px-3 py-1.5 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-600/80 transform transition-all duration-200 ease">
                Follow
              </button>
            </div>
          )) : user?.followers?.map((user) => (
            <div key={user._id} className="flex items-center gap-3 px-4 py-2.5 hover:bg-white/5">
              <img
                src={user.profilePic}
                className="w-10 h-10 rounded-full object-cover"
                alt={user.userName}
              />
              <div className="flex-1">
                <p className="text-sm font-medium text-white">{user.userName}</p>
                <p className="text-xs text-gray-400">{user.designation}</p>
              </div>
              <button className="text-xs px-3 py-1.5 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-600/80 transform transition-all duration-200 ease">
                Follow
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}