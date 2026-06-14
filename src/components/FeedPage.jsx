import React, { use, useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "./utils/UserCard";
import axios from "axios";
import { BASE_URL } from "../Constants";
import { addAllUsers } from "./Redux/userSlices/allUserSlice";
import { addUserProfile } from "./Redux/userSlices/userSlice";

const FeedPage = () => {
  const [filteredUser, searchFilteredUser] = useState("");
  const [users, setUsers] = useState([]);
  const allUsers = useSelector((store) => store.allUsers);

  // console.log(allUsers);
const dispatch = useDispatch();

  const handleUserSearch = (e) => {
    const filtered = allUsers?.filter((each) =>
      each?.userName?.toLowerCase()?.includes(e.target.value)
    );

    setUsers(filtered);
  };

  const fetchUserProfile = async () => {
    try {
      const res1 = await axios.get(BASE_URL + "/profile", {
        withCredentials: true,
      });
      if (res1?.data?.success) {
        console.log("feed", res1)
        dispatch(addUserProfile(res1?.data?.data))
        // setUserProfile(res1?.data?.data)

        const allRes = await axios.get(BASE_URL + "/allusers", { withCredentials: true });

        // dispatch(addAllUsers(allRes?.data?.suggestions))

      }
    } catch (error) {
      console.log("Error :", error);
    }
  };

  useEffect(() => {
    setUsers(allUsers);
    fetchUserProfile()
  }, [allUsers]);

  return (
    <div className="2xl:h-[86vh] bg-[#3A3A3A] 2xl:pt-12 2xl:px-44 3xl:px-84 h-[86vh]">
      <div className="flex items-center justify-between h-[10%] py-10 3xl:py-4">
        <div className="flex flex-col gap-1 pl-4 mt-8">
          <div className="flex items-center gap-2 ">
            <h2 className="text-white font-bold text-4xl tracking-tight">
              Discover People
            </h2>
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          </div>
          <p className="text-gray-500 text-sm font-normal">
            Find and connect with community members
          </p>
        </div>

        {/* Search */}
        <div className="relative hidden sm:hidden lg:flex md:flex xl:flex 2xl:flex 3xl:flex items-center group">
          <CiSearch className="absolute left-3.5 text-gray-500 group-focus-within:text-red-500 transition-colors text-base pointer-events-none" />
          <input
            type="text"
            placeholder="Search people..."
            onChange={handleUserSearch}
            className=" bg-white/[0.04] border border-white/[0.09] rounded-xl pl-10 pr-4 py-2.5 w-72 text-sm text-gray-300 placeholder:text-gray-600 font-[inherit] outline-none transition-all duration-200 focus:border-red-500/60 focus:bg-white/[0.06] focus:ring-2 focus:ring-red-500/10"
          />
        </div>
      </div>
      <div className="h-[85%] flex flex-wrap items-center justify-center px-4 gap-4 lg:gap-10 py-4 2xl:py-8 3xl:py-8 2xl:p 3xl:px-8 card_section overflow-auto mt-8">
        {users?.map((card) => (
          <UserCard key={card._id} card={card} />
        ))}
      </div>
    </div>
  );
};

export default FeedPage;
