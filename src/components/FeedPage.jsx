import React from "react";
import { CiSearch } from "react-icons/ci";
import { useSelector } from "react-redux";
import UserCard from "./utils/UserCard";

const FeedPage = () => {

    const allUsers = useSelector((store) => store.allUsers)
    console.log(allUsers)
    return (
        <div className="2xl:h-[86vh] 2xl:py-14 2xl:px-92">
            <div className="flex items-center justify-between h-[10%]">
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 mt-1.5">
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
                <div className="relative flex items-center group">
                    <CiSearch className="absolute left-3.5 text-gray-500 group-focus-within:text-red-500 transition-colors text-base pointer-events-none" />
                    <input
                        type="text"
                        placeholder="Search people..."
                        className=" bg-white/[0.04] border border-white/[0.09] rounded-xl pl-10 pr-4 py-2.5 w-72 text-sm text-gray-300 placeholder:text-gray-600 font-[inherit] outline-none transition-all duration-200 focus:border-red-500/60 focus:bg-white/[0.06] focus:ring-2 focus:ring-red-500/10"
                    />
                </div>
            </div>
            <div className="h-[90%] flex items-center justify-center gap-4 overflow-x-auto pb-3 px-1 card_section">
                {allUsers?.map((card) => (
                    <UserCard key={card._id} card={card} />
                ))}
            </div>
        </div>
    )
}

export default FeedPage;