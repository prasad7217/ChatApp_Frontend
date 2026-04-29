import React, { useEffect, useState } from "react";
import { BsChatSquareDotsFill } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { AiOutlineLogin } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addUserProfile } from "./Redux/userSlices/userSlice";
import { MdMessage } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";

const Navbar = () => {

    const [loginHover, setLoginHover] = useState(false);
    const [iconHover, seticonHover] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector((store) => store.user.profile);

    const fetchUserProfile = async () => {
        try {
            const res1 = await axios.get("http://localhost:7777/api/profile", { withCredentials: true });
            if (res1?.data?.success) {
                dispatch(addUserProfile(res1?.data?.data))
                // navigate(`/profile`)
            }
        } catch (error) {
            console.log("Error :", error)
        }

    }

    useEffect(() => {
        !user && fetchUserProfile();
    }, [user])

    return (
        <div className="xl:px-40 lg:px-24 md:px-24 px-8 py-4 xl:py-4 lg:py-4 md:py-4 h-[10h] flex items-center justify-between navShadow bg-gray-800 fixed top-0 left-0 w-full">
            <div className="relative cursor-pointer" onMouseEnter={() => seticonHover(true)} onMouseLeave={() => seticonHover(false)} onClick={() => navigate("/")}>
                <BsChatSquareDotsFill className="text-[26px] text-[#DB2777]" />
                {iconHover && <p className="absolute -top-4 -left-2.5 text-[14px] bg-gray-400 text-gray-100 px-1 py-0.5 font-semibold rounded-[5px]" >Home</p>}
            </div>
            <div className="flex items-center justify-center gap-6">

                <div className="relative cursor-pointer " onMouseEnter={() => setLoginHover(true)} onMouseLeave={() => setLoginHover(false)} onClick={() => !user && navigate('/login')}>
                    {user?.profilePic ? <img src={user?.profilePic} alt="" className="w-10 h-10" /> : <FaUserAlt className="text-[20px] text-gray-400" />}
                    {!user && loginHover && <p className="absolute -top-5 -left-3 text-[14px] bg-gray-600 text-gray-100 px-1 py-0.5 font-semibold rounded-[5px]">Login</p>}
                    {user && loginHover && <div className="absolute top-10 left-0 w-32 bg-gray-600 rounded-xl shadow-lg py-1 text-gray-100 font-medium">
                        {/* Menu List */}
                        <ul className="py-1">
                            <li className="px-2 py-1 flex items-center gap-3 hover:bg-gray-700 cursor-pointer transition-colors">
                                <MdMessage className="text-gray-100 text-lg" />
                                <span className="text-sm">Chats</span>
                            </li>

                            {/* Border separator before logout */}
                            <li className="my-1 border-t border-gray-100"></li>

                            <li className="px-2 py-1 flex items-center gap-3 hover:bg-gray-700 group cursor-pointer transition-colors">
                                <IoMdLogOut className="text-gray-100 group-hover:text-red-600 text-lg" />
                                <span className="text-sm group-hover:text-red-600">Logout</span>
                            </li>
                        </ul>
                    </div>}
                </div>
            </div>
        </div>
    )

}

export default Navbar;