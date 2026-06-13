import React, { useEffect, useState } from "react";
import { BsChatSquareDotsFill, BsMessenger } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { AiOutlineLogin } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addUserProfile, clearUserProfile } from "./Redux/userSlices/userSlice";
import { MdMessage } from "react-icons/md";
import { IoMdLogOut, IoMdPerson } from "react-icons/io";
import { IoChatboxEllipsesSharp } from "react-icons/io5";
import { BASE_URL } from "../Constants";
import { addAllUsers } from "./Redux/userSlices/allUserSlice";
import { FaUserGroup } from "react-icons/fa6";
import { LiaFacebookMessenger } from "react-icons/lia";
import { TbBrandFeedly } from "react-icons/tb";
import { FaUserPlus } from "react-icons/fa";

const Navbar = () => {
  const [loginHover, setLoginHover] = useState(false);
  const [iconHover, seticonHover] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [hasFetched, setHasFetched] = useState(false);
  const user = useSelector((store) => store.user.profile);
 
  const fetchUserProfile = async () => {
    try {
      const res1 = await axios.get(BASE_URL + "/profile", {
        withCredentials: true,
      });
      if (res1?.data?.success) {
        dispatch(addUserProfile(res1?.data?.data))
        // setUserProfile(res1?.data?.data)

        const allRes = await axios.get(BASE_URL + "/allusers", { withCredentials: true });

        dispatch(addAllUsers(allRes?.data?.suggestions))

      }
    } catch (error) {
      console.log("Error :", error);
    }
  };

  const userLogout = async () => {
    const res = await axios.post(BASE_URL + "/logout", {}, {
      withCredentials: true,
    },
    );

    if (res?.data?.success) {
      dispatch(clearUserProfile());
      navigate("/");
    }
  };

 useEffect(() => {
    if (!user && !hasFetched) {
      setHasFetched(true); 
      fetchUserProfile();
    }
  }, [hasFetched]);

  return (
    <div className="fixed top-0 left-0 w-full bg-[#2A2A2A] navShadow z-50 px-3 sm:px-5 md:px-8 lg:px-12 xl:px-20 2xl:px-32 py-3 flex items-center justify-between min-h-[64px]">
      <div
        className="relative cursor-pointer"
        onMouseEnter={() => seticonHover(true)}
        onMouseLeave={() => seticonHover(false)}
        onClick={() => navigate("/feed")}
      >
        <div className="flex items-center gap-2 sm:gap-3 px-1 sm:px-3 py-2">
          {/* Icon */}
          <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-red-600 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path
                d="M3 6.5C3 5.12 4.12 4 5.5 4h11C17.88 4 19 5.12 19 6.5v8c0 1.38-1.12 2.5-2.5 2.5H13l-3 3.5L7 17H5.5C4.12 17 3 15.88 3 14.5v-8z"
                fill="white"
                opacity="0.95"
              />
              <circle cx="8" cy="10.5" r="1.1" fill="#6C63FF" />
              <circle cx="11" cy="10.5" r="1.1" fill="#6C63FF" />
              <circle cx="14" cy="10.5" r="1.1" fill="#6C63FF" />
            </svg>
          </div>

          {/* Text */}
          <div className="flex flex-col leading-none">
            <span
              className="font-extrabold text-[18px] sm:text-[20px] lg:text-[22px] tracking-tight text-white"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Nex<span className="text-red-600">chat</span>
            </span>
            <span className="hidden sm:block text-[9px] lg:text-[10px] tracking-[1.5px] uppercase text-white/30 mt-[2px]">
              Real-time messaging
            </span>
          </div>
        </div>

        {iconHover && (
          <p className="hidden sm:block absolute -top-5 left-0 text-xs bg-gray-400 text-gray-100 px-2 py-0.5 font-semibold rounded-md whitespace-nowrap">
            Home
          </p>
        )}
      </div>

      <div className="flex items-center justify-center gap-4 sm:gap-5 md:gap-7 lg:gap-10">
        {user && <><Link to={'/chatarea/:'}><div className="relative">
          <BsMessenger className="text-[20px] sm:text-[22px] text-gray-300" />
          <span className="absolute top-[-10px] right-[-10px] text-white text-[10px] font-semibold py-0.5 px-1 rounded-full bg-red-600">9+</span>
        </div></Link>
          <div className="relative" onClick={() => navigate("/recieved/requests")}>
            <FaUserGroup className="text-[20px] sm:text-[22px] text-gray-300" />
            {user?.recievedRequests?.length > 0 && <span className="absolute -top-2 -right-2 text-white text-[9px] sm:text-[10px] font-semibold py-0.5 px-1.5 rounded-full bg-red-600">{user?.recievedRequests?.length}</span>}
          </div></>}
        <div
          className="relative cursor-pointer"
          onMouseEnter={() => setLoginHover(true)}
          onMouseLeave={() => setLoginHover(false)}
        >
          {user?.profilePic ? (
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11">
              <img
                src={user?.profilePic}
                alt={user?.userName || "User"}
                className="w-full h-full rounded-full object-cover"
              />
              {/* Online indicator */}
              <span className="absolute bottom-0 right-0 w-3 h-3 sm:w-3.5 sm:h-3.5 bg-green-400 border-2 border-gray-800 rounded-full"></span>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/login")}
                className="flex items-center gap-1.5 sm:gap-2 border border-red-500 text-red-400 hover:bg-red-500 hover:text-white active:scale-95 transition-all text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl cursor-pointer"
              >
                <AiOutlineLogin className="text-[18px]" />
                Login
              </button>

              <Link to={"/signup"}><button
                className="hidden md:flex items-center gap-2 bg-red-600 hover:bg-red-500 active:scale-95 transition-all text-white text-sm font-semibold px-4 py-2 rounded-xl cursor-pointer"
              >
                <FaUserAlt className="text-[14px]" />
                SignUp
              </button>
              </Link>
            </div>
          )}
          {!user && loginHover && (
            <p className="hidden sm:block absolute -top-6 left-0 text-xs bg-gray-600 text-gray-100 px-2 py-1 font-semibold rounded-md whitespace-nowrap">
              Login
            </p>
          )}
          {user && loginHover && (
            <div className="absolute top-10 right-0 sm:left-auto w-40 bg-[#3A3A3A] rounded-xl shadow-lg py-1 text-gray-100 font-medium border border-gray-700">
              {/* Menu List */}
              <ul className="py-1">
                <Link to={"/feed"}><li className="px-2 py-1 flex items-center gap-3 hover:bg-[#4A4A4A] cursor-pointer transition-colors">
                  <TbBrandFeedly className="text-gray-100 text-lg" />
                  <span className="text-sm">Feed</span>
                </li>
                </Link>
                <Link to={"/pending/requests"}><li className="px-2 py-1 flex items-center gap-3 hover:bg-[#4A4A4A] cursor-pointer transition-colors">
                  <FaUserPlus className="text-gray-100 text-lg" />
                  <span className="text-sm">Requested</span>
                </li>
                </Link>
                <Link to={`/profile?id=${user._id}`}><li className="px-3 py-2 flex items-center gap-3 hover:bg-[#4A4A4A] cursor-pointer transition-colors">
                  <IoMdPerson className="text-gray-100 text-lg" />
                  <span className="text-sm">Profile</span>
                </li>
                </Link>
                {/* Border separator before logout */}
                <li className="my-1 border-t border-gray-100"></li>

                <li
                  className="px-2 py-1 flex items-center gap-3 hover:bg-red-900/30 group cursor-pointer transition-colors"
                  onClick={userLogout}
                >
                  <IoMdLogOut className="text-gray-100 group-hover:text-red-600 text-lg" />
                  <span className="text-sm group-hover:text-red-600">
                    Logout
                  </span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
