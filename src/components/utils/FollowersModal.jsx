// components/FollowersModal.jsx
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import axios from "axios";
import { BASE_URL } from "../../Constants";
import { useDispatch } from "react-redux";
import { addUserProfile } from "../Redux/userSlices/userSlice";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { MdVerified } from "react-icons/md";
import { Link } from "react-router-dom";

export default function FollowersModal({ user, state, close }) {
  // const [activeTab, setActiveTab] = useState("followers");

  const [followers, setFollowers] = useState();
  const [following, setFollowing] = useState();
  const [searchValue, setSearchValue] = useState("");

  const dispatch = useDispatch();

  const handleUnfollow = async (id, status) => {
    if (status === "unfollow") {
      try {
        const unfollowRes = await axios.post(
          BASE_URL + "/request/status/" + id,
          { status },
          { withCredentials: true },
        );

        if (unfollowRes?.data?.success) {
          dispatch(addUserProfile(unfollowRes?.data?.data));
        }
      } catch (error) {
        console.log("Error", error);
      }
    } else if (status === "remove") {
      try {
        const unfollowRes = await axios.post(
          BASE_URL + "/request/status/" + id,
          { status },
          { withCredentials: true },
        );
        console.log("remove", unfollowRes);
        if (unfollowRes?.data?.success) {
          dispatch(addUserProfile(unfollowRes?.data?.data));
        }
      } catch (error) {
        console.log("Error", error);
      }
    }
  };

  const followRequest = async (id, status) => {

    try {

      const res = await axios.post(BASE_URL + "/request/sent/" + id, { status }, { withCredentials: true });
      console.log("follow", res)
      if (res?.data?.success) {
        dispatch(addUserProfile(res?.data?.data));
      }

    } catch (error) {
      console.log("Error :", error)
    }

  }


  useEffect(() => {
    setFollowers(user?.followers);
    setFollowing(user?.following);

    if (state === "follower") {
      const filtered = followers?.filter((each) =>
        each?.userName?.toLowerCase()?.includes(searchValue),
      );

      if (!filtered || filtered.length === 0 || searchValue === "") {
        setFollowers(user?.followers);
      } else {
        setFollowers(filtered);
      }
    } else {
      const filtered = following?.filter((each) =>
        each?.userName?.toLowerCase()?.includes(searchValue),
      );

      if (!filtered || filtered.length === 0 || searchValue === "") {
        setFollowing(user?.following);
      } else {
        setFollowing(filtered);
      }
    }
  }, [searchValue]);

  // const list = activeTab === "followers" ? followers : following;

  return (
    <div className="fixed inset-0 bg-[#2A2A2A]/75 flex items-center justify-center z-50 p-2 sm:p-4">
      <div
        className="bg-[#2A2A2A] rounded-2xl w-full max-w-[95vw] sm:max-w-[500px] h-[85vh] sm:min-h-[400px] sm:max-h-[550px] flex flex-col overflow-hidden animate__animated animate__zoomIn animate__faster"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full bg-[#4A4A4A] px-3 sm:px-4 py-3 flex items-center justify-between shrink-0">
          <p></p>
          <p className="text-gray-200 text-sm sm:text-base font-medium">
            {state === "followers" ? "Followers" : "Following"}
          </p>
          <IoClose
            className="text-gray-300 text-[28px] sm:text-[32px] cursor-pointer hover:bg-[#2A2A2A] rounded-full p-1"
            onClick={() => close(false)}
          />
        </div>
        <div className="relative w-full p-3 sm:p-4 shrink-0">
          <FiSearch className="absolute text-[18px] sm:text-[22px] top-1/2 -translate-y-1/2 left-6 text-gray-200" />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            name=""
            id=""
            className="bg-[#3A3A3A] w-full py-2 sm:py-2.5 pl-10 pr-4 rounded-2xl text-sm sm:text-base text-gray-200 focus:outline-none focus:border border-gray-600"
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
        <div className="overflow-y-auto flex-1 min-h-0">
          {state === "following"
            ? following?.map((user1, i) => {

              const fil = user?.mutualfrds?.filter((each) =>
                each?._id.includes(user1?._id),
              );

              return (
                <div
                  key={user1._id}
                  className="flex items-center gap-3 px-3 sm:px-4 py-3 hover:bg-white/5"
                >
                  <div className="relative">
                    <img
                      src={user1.profilePic}
                      className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover ${user1?.isSubscribed && "border border-2 border-[#2563eb]"}`}
                      alt={user1.userName}
                    />
                    {user1?.isSubscribed && <div className="absolute -top-1 -right-1 sm:-right-2 w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center bg-[#2563eb] p-0.5 rounded-full">
                      <MdVerified className=" text-white font-bold text-[16px]" />
                    </div>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-sm font-medium text-white">
                      <span className="truncate max-w-[140px] sm:max-w-none">
                      {user1.userName}
                      </span>
                      {"  "}
                      {user1?.isSubscribed && <p className="flex items-center justify-center gap-1 bg-gradient-to-r from-[#2563eb] via-[#2563eb] to-gray-400 py-0.5 px-2 rounded-full whitespace-nowrap">
                        <MdVerified className="text-[12px] text-white" />
                        <span className="text-[12px] text-white font-normal">Nextchat Member</span>
                      </p>}
                      <span
                        className="text-[12px] text-red-400 font-normal cursor-pointer"
                        onClick={() => handleUnfollow(user1._id, "unfollow")}
                      >
                        . Unfollow
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 truncate">
                      {user1.designation}
                    </p>
                  </div>
                  {fil?.length > 0 && user1?.isSubscribed === true ? <Link to={'/chatarea/'+user1._id}><button className="px-3 sm:px-4 py-2 rounded-lg bg-[#e53e3e] text-white text-xs font-semibold hover:bg-[#c53030] transition whitespace-nowrap">
                    Message
                  </button></Link> :
                    <button className="px-3 sm:px-4 py-2 rounded-lg border border-white/20 text-white/70 text-xs font-medium whitespace-nowrap">
                      Following
                    </button>}
                </div>
              );
            })
            : followers?.map((user1) => {
              const fil = user?.mutualfrds?.filter(
                (each) => each?._id === user1?._id,
              );

              return (
                <div
                  key={user1._id}
                  className="flex items-center gap-3 px-3 sm:px-4 py-3 hover:bg-white/5"
                >
                  <div className="relative">
                    <img
                      src={user1.profilePic}
                      className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover ${user1?.isSubscribed && "border border-2 border-[#2563eb]"}`}
                      alt={user1.userName}
                    />
                    {user1?.isSubscribed && <div className="absolute -top-1 -right-1 sm:-right-2 w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center bg-[#2563eb] p-0.5 rounded-full">
                      <MdVerified className=" text-white font-bold text-[16px]" />
                    </div>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-sm font-medium text-white">
                      <span className="truncate max-w-[140px] sm:max-w-none">
                      {user1.userName}
                      </span>
                      {"  "}
                      {user1?.isSubscribed && <span className="flex items-center justify-center gap-1 bg-gradient-to-r from-[#2563eb] via-[#2563eb] to-gray-400 py-0.5 px-2 rounded-full whitespace-nowrap">
                        <MdVerified className="text-[12px] text-white" />
                        <span className="text-[12px] text-white font-normal">Nextchat Member</span>
                      </span>}
                      <span
                        className="text-[12px] text-red-400 font-normal cursor-pointer"
                        onClick={() => handleUnfollow(user1._id, "remove")}
                      >
                        . remove
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 truncate">
                      {user1.designation}
                    </p>
                  </div>
                  {fil?.length > 0 ? <button className="px-3 sm:px-4 py-2 rounded-lg border border-white/20 text-white/70 text-xs font-medium whitespace-nowrap">
                    Follower
                  </button> :
                    <button className="px-3 sm:px-4 py-2 rounded-lg border border-white/20 text-white/70 text-xs font-medium whitespace-nowrap" onClick={() => followRequest(user1._id, status = "requested")}>
                      Follow
                    </button>}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
