import React from "react";
import { BsChatSquareDotsFill } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { AiOutlineLogin } from "react-icons/ai";

const Navbar = () => {
    return (
        <div className="px-24 py-4 h-[10h] flex items-center justify-between navShadow">
            <div>
                <BsChatSquareDotsFill className="text-[26px] text-[#DB2777]"/>
            </div>
            <div className="flex items-center justify-center gap-6">
                <div>
                    <FaUserAlt className="text-[20px] text-[#D6D3D1]"/>
                </div>
                <div >
                    <AiOutlineLogin className="text-[20px] text-[#737373]"/>
                </div>
            </div>
        </div>
    )
}

export default Navbar;