import React, { useEffect, useState } from "react";
import { BsChatSquareDotsFill } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { AiOutlineLogin } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addUserProfile, clearUserProfile } from "./Redux/userSlices/userSlice";
import { MdMessage } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import { IoChatboxEllipsesSharp } from "react-icons/io5";
import { BASE_URL } from "../Constants";
import { addAllUsers } from "./Redux/userSlices/allUserSlice";

const Navbar = () => {
  const [loginHover, setLoginHover] = useState(false);
  const [iconHover, seticonHover] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user.profile);

  const fetchUserProfile = async () => {
    try {
      const res1 = await axios.get(BASE_URL + "/profile", {
        withCredentials: true,
      });
      if (res1?.data?.success) {
        dispatch(addUserProfile(res1?.data?.data))

        const allRes = await axios.get(BASE_URL + "/allusers", { withCredentials: true });

        dispatch(addAllUsers(allRes?.data?.data))

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
    !user && fetchUserProfile();
  }, [user]);

  return (
    <div className="fixed top-0 left-0 w-full bg-gray-800 navShadow z-50 px-4 sm:px-6 md:px-20 lg:px-16 xl:px-44 2xl:px-88 py-4 2xl:py-10 xl:py-8 lg:py-8 md:py-8 flex items-center justify-between h-16">
      <div
        className="relative cursor-pointer"
        onMouseEnter={() => seticonHover(true)}
        onMouseLeave={() => seticonHover(false)}
        onClick={() => navigate("/")}
      >
        <div className="flex items-center gap-[10px] px-[18px] pl-[10px] py-[10px]">
          {/* Icon */}
          <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
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
              className="font-extrabold text-[22px] tracking-tight text-white"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Nex<span className="text-red-600">chat</span>
            </span>
            <span className="text-[10px] tracking-[1.5px] uppercase text-white/30 mt-[3px]">
              Real-time messaging
            </span>
          </div>
        </div>

        {iconHover && (
          <p className="absolute -top-4 -left-2.5 text-[14px] bg-gray-400 text-gray-100 px-1 py-0.5 font-semibold rounded-[5px]">
            Home
          </p>
        )}
      </div>
      <div className="flex items-center justify-center gap-6">
        <div
          className="relative cursor-pointer "
          onMouseEnter={() => setLoginHover(true)}
          onMouseLeave={() => setLoginHover(false)}
        >
          {user?.profilePic ? (
            <div className="relative w-10 h-10 2xl:w-14 2xl:h-14">
              <img
                src={user?.profilePic}
                alt={user?.userName || "User"}
                className="w-full h-full rounded-full object-cover"
              />
              {/* Online indicator */}
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 2xl:w-4 2xl:h-4 bg-green-400 border-2 border-gray-800 rounded-full"></span>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/login")}
                className="flex items-center gap-2 border border-red-500 text-red-400 hover:bg-red-500 hover:text-white active:scale-95 transition-all text-sm font-semibold px-4 py-2 rounded-xl cursor-pointer"
              >
                <AiOutlineLogin className="text-[18px]" />
                Login
              </button>

              <Link to={"/signup"}><button
                className="flex items-center gap-2 bg-red-600 hover:bg-red-500 active:scale-95 transition-all text-white text-sm font-semibold px-4 py-2 rounded-xl cursor-pointer"
              >
                <FaUserAlt className="text-[14px]" />
                Sign Up
              </button>
              </Link>
            </div>
          )}
          {!user && loginHover && (
            <p className="absolute -top-5 -left-3 text-[14px] bg-gray-600 text-gray-100 px-1 py-0.5 font-semibold rounded-[5px]">
              Login
            </p>
          )}
          {user && loginHover && (
            <div className="absolute 2xl:top-10 left-0 w-32 bg-gray-600 rounded-xl shadow-lg py-1 text-gray-100 font-medium">
              {/* Menu List */}
              <ul className="py-1">
                <li className="px-2 py-1 flex items-center gap-3 hover:bg-gray-700 cursor-pointer transition-colors">
                  <MdMessage className="text-gray-100 text-lg" />
                  <span className="text-sm">Chats</span>
                </li>

                {/* Border separator before logout */}
                <li className="my-1 border-t border-gray-100"></li>

                <li
                  className="px-2 py-1 flex items-center gap-3 hover:bg-gray-700 group cursor-pointer transition-colors"
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
