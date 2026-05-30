import React from "react";
import { useSelector } from "react-redux";

const PendingRequests = () => {
  const userProfile = useSelector((store) => store.user.profile);

  return (
    <div className="3xl:min-h-[86vh] 2xl:min-h-[80vh] w-full bg-[#3A3A3A] px-4 sm:px-8 md:px-16 py-8 2xl:px-48 2xl:py-16 3xl:py-12 3xl:px-80">
      
      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">
          Pending Requests
        </h1>

        <p className="text-gray-300 mt-2">
          Manage all your incoming follow requests
        </p>
      </div>

      {/* Requests Container */}
      <div className="flex flex-col items-center justify-center gap-6 overflow-auto">
        {userProfile?.sentRequests?.map((user) => (
          <div
            key={user?._id}
            className="bg-[#2A2A2A]/50 2xl:w-[50%] border border-white/10 rounded-2xl p-5 shadow-lg hover:scale-[1.02] transition-all duration-300 flex items-center justify-between"
          >
            {/* Top Section */}
            <div className="flex items-center gap-4">
              
              {/* Profile Image */}
              <img
                src={user?.profilePic}
                alt={user?.userName}
                className="w-16 h-16 rounded-full object-cover"
              />

              {/* User Details */}
              <div className="flex flex-col">
                <h2 className="text-white text-lg font-semibold">
                  {user?.userName}
                </h2>

                <p className="text-xs text-gray-500 mt-1">
                  {user?.designation}
                </p>
              </div>
            </div>
            {/* Buttons */}
            <div className="flex items-center gap-3 mt-6">
              
              {/* Accept Button */}
              <button
                className=" bg-[#3A3A3A] text-white py-1 px-2 rounded-lg hover:bg-[#4A4A4A] flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer"
              >
                requsted
              </button>
              <button
                className=" bg-red-600 text-white py-1 px-2 rounded-lg hover:bg-red-600/80 flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {userProfile?.sentRequests?.length === 0 && (
        <div className="flex items-center justify-center h-[60vh]">
          <h2 className="text-2xl text-gray-300 font-semibold">
            No Pending Requests
          </h2>
        </div>
      )}
    </div>
  );
};

export default PendingRequests;