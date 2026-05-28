import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../../Constants";
import { useDispatch } from "react-redux";
import { addUserProfile } from "../Redux/userSlices/userSlice";

export default function UserCard({ card }) {
  const [following, setFollowing] = useState(false);

  const dispatch = useDispatch();

  const handleFriendRequest = async (id, status) => {
    try {
      console.log(id)
      const res = await axios.post(BASE_URL + "/request/sent/" + id, { status }, { withCredentials: true });
      console.log("update :", res)
      if (res?.data?.success) {
        setFollowing(true)
        dispatch(addUserProfile(res?.data?.data))
      }

    } catch (error) {
      console.log("Error :" + error)
    }
  }

  return (
    <div className="2xl:w-52 w-44 lg:h-[300px] md:h-[300px] 2xl:h-[300px] 3xl:h-[300px] bg-gray-800 dark:bg-[#1a1d27] border border-gray-600 dark:border-white/[0.07] rounded-2xl p-3 flex flex-col shadow-xl">

      {/* Top Section */}
      <div className="flex flex-col items-center gap-3">
        <img
          src={card?.profilePic}
          alt={card?.userName}
          className="w-20 h-20 rounded-full object-cover border-2 border-gray-500 dark:border-white/10"
          onError={(e) => {
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "flex";
          }}
        />

        {/* <div className="hidden w-20 h-20 rounded-full bg-blue-100 items-center justify-center text-blue-200 text-2xl font-semibold">
          {card?.userName?.charAt(0)}
        </div> */}

        <div className="text-center">
          <h3 className="text-gray-200 dark:text-white font-semibold text-base">
            {card?.userName}
          </h3>
          <p className="text-gray-300 text-sm mt-0.5 h-[16px]">
            {card?.designation}
          </p>
        </div>

        {/* ✅ Fixed height bio — clamp text overflow */}
        <p className="text-gray-400 text-sm text-center
         leading-relaxed h-[60px] overflow-wrap line-clamp-3">
          {card?.bio}
        </p>
      </div>

      {/* ✅ Button always pinned to bottom */}
      <button
        onClick={() => handleFriendRequest(card._id, "requested")}
        className={`w-full py-2 rounded-xl text-sm font-medium transition-all duration-200 mt-4 ${following
          ? "bg-transparent border border-red-500 text-red-500"
          : "bg-red-500 text-white border border-red-500 hover:bg-red-600"
          }`}
      >
        {following ? "requested" : "+ Follow"}
      </button>
    </div>
  );
}
