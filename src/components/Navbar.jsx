import React, { useState } from "react";
import { BsChatSquareDotsFill } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { AiOutlineLogin } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Navbar = () => {

    const [loginHover, setLoginHover] = useState(false);
    const [iconHover, seticonHover] = useState(false);

    const navigate = useNavigate();

    return (
        <div className="px-24 py-4 h-[10h] flex items-center justify-between navShadow bg-gray-800 fixed top-0 left-0 w-full">
            <div className="relative cursor-pointer" onMouseEnter={() => seticonHover(true)} onMouseLeave={() => seticonHover(false)} onClick={() => navigate("/")}>
                <BsChatSquareDotsFill className="text-[26px] text-[#DB2777]" />
                {iconHover && <p className="absolute -top-4 -left-2.5 text-[14px] bg-gray-400 text-gray-100 px-1 py-0.5 font-semibold rounded-[5px]" >Home</p>}
            </div>
            <div className="flex items-center justify-center gap-6">
                <div >
                    <FaUserAlt className={`text-[20px] text-gray-400 hover:text-gray-500/80 `} />

                </div>
                <div className="relative cursor-pointer " onMouseEnter={() => setLoginHover(true)} onMouseLeave={() => setLoginHover(false)} onClick={() => navigate('/login')}>
                    <AiOutlineLogin className="text-[20px] text-gray-400" />
                    {loginHover && <p className="absolute -top-5 -left-3 text-[14px] bg-gray-600 text-gray-100 px-1 py-0.5 font-semibold rounded-[5px]" >Login</p>}
                </div>
            </div>
        </div>
    )
}

export default Navbar;