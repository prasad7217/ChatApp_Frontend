import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { BASE_URL } from "../../Constants";
import { addUserProfile } from "../Redux/userSlices/userSlice";
import { MdVerified } from "react-icons/md";

const RecievedRequests = () => {
  const [buttonText, setButtonText] = useState("Accept");
  const [index, setIndex] = useState(null);
  const userProfile = useSelector((store) => store.user.profile);

  const dispatch = useDispatch();

  const confirmRequest = async (id, status, i) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/response/" + id,
        { status },
        { withCredentials: true },
      );

      if (res?.data?.success) {
        setIndex(i)
        setButtonText("Followback");
        dispatch(addUserProfile(res?.data?.data))
      }
    } catch (error) {
      console.log("Error :", error);
    }
  };

  const handleFollowBack = async (id, status, i) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/sent/" + id,
        { status },
        { withCredentials: true },
      );

      if (res?.data?.success) {
        setIndex(i)
        setButtonText("Following");
      }
    } catch (error) {
      console.log("Error :", error);
    }
  };

  const handleRemoveRequest = async (id, status) => {
    try {
      const res = await axios.post(BASE_URL + "/request/response/" + id, { status }, { withCredentials: true });
      console.log("Reject :", res)
    } catch (error) {
      console.log("Error :", error)
    }
  }

  return (
    <div className="3xl:min-h-[86vh] 2xl:min-h-[83vh] w-full bg-[#3A3A3A] px-4 sm:px-8 md:px-16 py-8 2xl:px-48 2xl:py-16 3xl:py-12 3xl:px-80">
      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Pending Requests</h1>

        <p className="text-gray-300 mt-2">
          Manage all your incoming follow requests
        </p>
      </div>

      {/* Requests Container */}
      <div className="flex flex-col items-center justify-center gap-6 overflow-auto">
        {userProfile?.recievedRequests?.map((user, i) => (
          <div
            key={user?._id}
            className="bg-gray-800/35 2xl:w-[50%] border border-white/10 rounded-2xl p-5 shadow-lg hover:scale-[1.02] transition-all duration-300 flex items-center justify-between"
          >
            {/* Top Section */}
            <div className="flex items-center gap-4">
              {/* Profile Image */}
              <div className="relative">
                <img
                  src={user?.profilePic}
                  alt={user?.userName}
                  className={`w-16 h-16 rounded-full object-cover ${user?.isSubscribed && "border border-2 border-[#185FA5]"}`}
                />
                {user?.isSubscribed && <div className="absolute -top-0 -right-1 w-7 h-7 flex items-center justify-center bg-[#185FA5] p-0.5 rounded-full">
                  <MdVerified className=" text-white font-bold text-[18px]" />
                </div>}
              </div>
              {/* User Details */}
              <div className="flex flex-col">
                <div className="flex items-center justify-center gap-4">
                  <h2 className="text-white text-lg font-semibold">
                    {user?.userName}
                  </h2>
                  {user?.isSubscribed && <div className="inline-flex items-center gap-1.5 bg-[#185FA5] text-[#B5D4F4] text-xs font-medium px-4 py-1.5 rounded-full">
                    <MdVerified className="text-sm" />
                    <p className="m-0">Nexchat Member</p>
                  </div>}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {user?.designation}
                </p>
              </div>
            </div>
            {/* Buttons */}
            <div className="flex flex-col items-center gap-5 mt-">
              <RxCross2 className="text-gray-400 text-[16px] font-semibold ml-10 hover:text-gray-400/50 transition-all duration-200 ease cursor-pointer" onClick={() => handleRemoveRequest(user?._id, "rejected")} />
              {/* Accept Button */}
              <button
                onClick={() => {
                  if (buttonText === "Accept") {
                    confirmRequest(user?._id, "accepted", i);
                  } else {
                    handleFollowBack(user?._id, "requested", i);
                  }
                }}
                className=" bg-red-600 text-[14px] font-semibold text-white py-1 px-2 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer"
              >
                {index === i ? buttonText : "Accept"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {userProfile?.recievedRequests?.length === 0 && (
        <div className="flex items-center justify-center h-[60vh]">
          <h2 className="text-2xl text-gray-300 font-semibold">
            No Pending Requests
          </h2>
        </div>
      )}
    </div>
  );
};

export default RecievedRequests;
