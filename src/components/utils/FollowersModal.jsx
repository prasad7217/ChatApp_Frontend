// components/FollowersModal.jsx
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";

export default function FollowersModal({ user, state, close }) {

  // const [activeTab, setActiveTab] = useState("followers");

  const [followers, setFollowers] = useState();
  const [following, setFollowing] = useState();
  const [searchValue, setSearchValue] = useState('');


  useEffect(() => {

    setFollowers(user?.followers);
    setFollowing(user?.following);

    if (state === "follower") {

      const filtered = followers?.filter(each => each?.userName?.toLowerCase()?.includes(searchValue));

      if (!filtered || filtered.length === 0 || searchValue === '') {
        setFollowers(user?.followers);
      } else {
        setFollowers(filtered)
      }
    } else {
      const filtered = following?.filter(each => each?.userName?.toLowerCase()?.includes(searchValue));

      if (!filtered || filtered.length === 0 || searchValue === '') {
        setFollowing(user?.following);
      } else {
        setFollowing(filtered)
      }
    }

  }, [searchValue])

  // const list = activeTab === "followers" ? followers : following;

  return (
    <div className="fixed inset-0 bg-[#2A2A2A]/75 flex items-center justify-center z-50">
      <div
        className="bg-[#2A2A2A] rounded-2xl md:w-[500px] min-h-[400px] max-h-[480px] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full bg-[#4A4A4A] px-4 py-2 flex items-center justify-between">
          <p></p>
          <p className="text-gray-200">
            {state === "followers" ? "Followers" : "Following"}
          </p>
          <IoClose
            className="text-gray-300 text-[32px] cursor-pointer hover:bg-[#2A2A2A] rounded-full p-1"
            onClick={() => close(false)}
          />
        </div>
        <div className="relative w-full sm:py-4 sm:px-4">
          <FiSearch className="absolute text-[22px] sm:top-6 left-6 text-gray-200" />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            name=""
            id=""
            className="bg-[#3A3A3A] w-full py-1.5 pl-10 rounded-2xl text-gray-200 focus:outline-none focus:border border-gray-600"
            placeholder="search"
          />
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
          {state === "following"
            ? following?.map((user1, i) => {

              const fil = user?.mutualfrds?.filter(each => each?._id.includes(user1?._id));

              return (
                <div
                  key={user1._id}
                  className="flex items-center gap-3 px-4 py-2.5 hover:bg-white/2"
                >
                  <img
                    src={user1.profilePic}
                    className="w-10 h-10 rounded-full object-cover"
                    alt={user1.userName}
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">
                      {user1.userName}
                    </p>
                    <p className="text-xs text-gray-400">{user1.designation}</p>
                  </div>
                  <button className="text-[14px] text-gray-200 font-semibold px-1.5 py-0.5 rounded-lg bg-[#4D4D4D]/40 hover:bg-[#4D4D4D] cursor-pointer transform transition-all duration-100 ease">
                    {fil.length > 0 ? "message" : "Following"}
                  </button>
                </div>
              )
            })
            : followers?.map((user1) => {

              const fil = user?.mutualfrds?.filter(each => each?._id === user1?._id);

              return (
                <div
                  key={user1._id}
                  className="flex items-center gap-3 px-4 py-2.5 hover:bg-white/5"
                >
                  <img
                    src={user1.profilePic}
                    className="w-10 h-10 rounded-full object-cover"
                    alt={user1.userName}
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">
                      {user1.userName}{"  "}<span className="text-[12px] text-red-400 font-normal">. remove</span>
                    </p>
                    <p className="text-xs text-gray-400">{user1.designation}</p>
                  </div>
                  <button className="text-[14px] px-1.5 py-0.5 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-600/80 transform transition-all duration-200 ease">
                    {fil.length > 0 ? "Follower" : "Follow"}
                  </button>
                </div>
              )
            })}
        </div>
      </div>
    </div>
  );
}
