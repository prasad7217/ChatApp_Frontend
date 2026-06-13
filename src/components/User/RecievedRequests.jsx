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
    <div className="min-h-screen w-full bg-[#3A3A3A] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-32 py-6 sm:py-8 lg:py-10">
      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">Recieved Requests</h1>

        <p className="text-sm sm:text-base text-gray-300 mt-2">
          Manage all your incoming follow requests
        </p>
      </div>

      {/* Requests Container */}
      <div className="flex flex-col items-center gap-4 sm:gap-6 overflow-auto">
        {userProfile?.recievedRequests?.map((user, i) => (
          <div
            key={user?._id}
            className="w-full max-w-4xl bg-gray-800/35 border border-white/10 rounded-2xl p-4 sm:p-5 shadow-lg hover:scale-[1.01] transition-all duration-300 flex flex-col sm:flex-row items-center sm:items-center justify-between gap-4"
          >
            {/* Top Section */}
            <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4 w-full">
              {/* Profile Image */}
              <div className="relative">
                <img
                  src={user?.profilePic}
                  alt={user?.userName}
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover ${user?.isSubscribed && "border border-2 border-[#185FA5]"}`}
                />
                {user?.isSubscribed && <div className="absolute -top-1 -right-1 w-5 h-5 sm:w-7 sm:h-7 flex items-center justify-center bg-[#185FA5] p-0.5 rounded-full">
                  <MdVerified className=" text-white font-bold text-[18px]" />
                </div>}
              </div>
              {/* User Details */}
              <div className="flex flex-col text-center sm:text-left min-w-0">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h2 className="text-white text-base sm:text-lg font-semibold break-all">
                    {user?.userName}
                  </h2>
                  {user?.isSubscribed && <div className="inline-flex items-center gap-1.5 bg-[#185FA5] text-[#B5D4F4] text-[11px] sm:text-xs font-medium px-3 sm:px-4 py-1 rounded-full whitespace-nowrap">
                    <MdVerified className="text-sm" />
                    <p className="m-0">Nexchat Member</p>
                  </div>}
                </div>
                <p className="text-xs sm:text-sm text-gray-500 mt-1 break-words">
                  {user?.designation}
                </p>
              </div>
            </div>
            {/* Buttons */}
            <div className="flex flex-row sm:flex-col items-center justify-center gap-3 sm:gap-5 w-full sm:w-auto">
              <RxCross2 className="text-gray-400 text-[18px] sm:text-[16px] hover:text-gray-400/50 transition-all duration-200 ease cursor-pointer sm:ml-6" onClick={() => handleRemoveRequest(user?._id, "rejected")} />
              {/* Accept Button */}
              <button
                onClick={() => {
                  if (buttonText === "Accept") {
                    confirmRequest(user?._id, "accepted", i);
                  } else {
                    handleFollowBack(user?._id, "requested", i);
                  }
                }}
                className=" bg-red-600 text-xs sm:text-sm font-semibold text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer whitespace-nowrap min-w-[90px]"
              >
                {index === i ? buttonText : "Accept"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {userProfile?.recievedRequests?.length === 0 && (
        <div className="flex items-center justify-center min-h-[50vh]">
          <h2 className="text-2xl text-gray-300 font-semibold">
            No Pending Requests
          </h2>
        </div>
      )}
    </div>
  );
};

export default RecievedRequests;
