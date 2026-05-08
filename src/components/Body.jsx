import React from "react";
import { messages } from "./utils/defaults";
import { IoArrowForward, IoCheckmarkCircleOutline, IoPlayCircleOutline } from "react-icons/io5";
import { BsChatSquareText } from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";
import { MdLockOpen } from "react-icons/md";

const Body = () => {
    return (
        <div className="w-full h-[88vh] xl:h-[86vh] lg:h-[80vh] xl:px-24 lg:px-24 overflow-auto">
            <div className="w-full h-[70%] flex flex-col xl:flex-row lg:flex-row items-center justify-center gap-6 xl:gap-0 lg:gap-0 px-6 sm:px-8 xl:px-48 lg:px-48 md:px-44 py-8 xl:py-0 lg:py-0">

                {/* Left Section */}
                <div className="w-full xl:w-[50%] lg:w-[50%] flex flex-col gap-5 items-center xl:items-start lg:items-start text-center xl:text-left lg:text-left">

                    {/* Badge */}
                    <div className="inline-flex items-center gap-1.5 bg-green-900 w-fit text-green-100 font-medium px-3 py-1.5 rounded-full">
                        <IoCheckmarkCircleOutline size={15} className="shrink-0" />
                        <span className="text-[12px] sm:text-[13px]">Real-time messaging</span>
                    </div>

                    {/* Heading */}
                    <div className="flex flex-col gap-1">
                        <h1 className="text-[30px] sm:text-[38px] md:text-[44px] lg:text-[46px] xl:text-[52px] font-semibold leading-tight text-gray-200">
                            Connect, Chat &
                        </h1>
                        <h1 className="text-[30px] sm:text-[38px] md:text-[44px] lg:text-[46px] xl:text-[52px] font-semibold leading-tight text-red-500">
                            Stay Together
                        </h1>
                    </div>

                    {/* Description */}
                    <p className="text-[13px] sm:text-[14px] md:text-[15px] text-gray-400 leading-relaxed max-w-xs sm:max-w-sm md:max-w-md xl:max-w-md">
                        A modern social platform to meet new people, share moments, and chat in real-time — without limits.
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-wrap items-center justify-center xl:justify-start lg:justify-start gap-3">
                        <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 active:scale-[0.98] text-white text-[13px] sm:text-[14px] font-medium px-5 py-2.5 rounded-full transition-all duration-200 cursor-pointer">
                            <span>Get started free</span>
                            <IoArrowForward size={15} className="shrink-0" />
                        </button>
                        <button className="flex items-center gap-2 border border-gray-500 hover:border-gray-300 hover:bg-gray-800 active:scale-[0.98] text-gray-300 hover:text-white text-[13px] sm:text-[14px] font-medium px-5 py-2.5 rounded-full transition-all duration-200 cursor-pointer">
                            <span>Learn more</span>
                            <IoPlayCircleOutline size={16} className="shrink-0" />
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-6 sm:gap-8">
                        <div className="flex flex-col gap-0.5">
                            <p className="text-[22px] sm:text-[26px] font-semibold text-white leading-none">12K+</p>
                            <p className="text-[11px] sm:text-[12px] text-gray-400">Active users</p>
                        </div>
                        <div className="w-[1px] h-8 bg-gray-600"></div>
                        <div className="flex flex-col gap-0.5">
                            <p className="text-[22px] sm:text-[26px] font-semibold text-white leading-none">98%</p>
                            <p className="text-[11px] sm:text-[12px] text-gray-400">Uptime</p>
                        </div>
                        <div className="w-[1px] h-8 bg-gray-600"></div>
                        <div className="flex flex-col gap-0.5">
                            <p className="text-[22px] sm:text-[26px] font-semibold text-white leading-none">50ms</p>
                            <p className="text-[11px] sm:text-[12px] text-gray-400">Avg latency</p>
                        </div>
                    </div>

                </div>

                {/* Right Section — Chat Mockup */}
                <div className="w-full xl:w-[50%] lg:w-[50%] flex items-center justify-center p-4 sm:p-6">
                    <div className="w-full max-w-[300px] sm:max-w-[320px] md:max-w-[340px] bg-white rounded-2xl border border-gray-200 overflow-hidden">

                        {/* Header */}
                        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-medium shrink-0">
                                GC
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900">Group Chat</p>
                                <p className="text-xs text-green-500 flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block shrink-0"></span>
                                    4 online
                                </p>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex flex-col gap-3 p-3">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex flex-col gap-1 ${msg.type === "sent" ? "items-end" : "items-start"}`}
                                >
                                    <div className={`px-3 py-2 text-sm max-w-[75%] ${msg.type === "sent"
                                        ? "bg-blue-100 text-blue-800 rounded-tl-2xl rounded-bl-2xl rounded-br-2xl rounded-tr-sm"
                                        : "bg-gray-100 text-gray-800 rounded-tr-2xl rounded-bl-2xl rounded-br-2xl rounded-tl-sm"
                                        }`}>
                                        {msg.text}
                                    </div>
                                    <span className="text-xs text-gray-400 px-1">{msg.time}</span>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>

            </div>
            <div className="w-full flex items-center justify-center flex-wrap gap-4 sm:gap-10 md:gap-16 lg:gap-20 xl:gap-20 px-6 sm:px-10 md:px-16 xl:px-32 py-6 sm:py-8">

                {/* Card 1 */}
                <div className="flex-1 min-w-[220px] max-w-[280px] px-5 py-5 bg-gray-800/60 border border-gray-700 rounded-2xl flex flex-col items-start gap-3 hover:border-blue-500/50 hover:bg-gray-800 hover:scale-[1.03] transform transition-all duration-300 cursor-pointer group">
                    <div className="p-2 bg-blue-900/60 border border-blue-700/40 rounded-xl group-hover:bg-blue-900 transition-all duration-300">
                        <BsChatSquareText className="text-blue-300 text-[22px]" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="text-gray-100 font-semibold text-[14px] sm:text-[15px]">Real-time chat</p>
                        <p className="text-gray-400 text-[12px] sm:text-[13px] leading-relaxed">
                            Instant messaging with live delivery status and typing indicators.
                        </p>
                    </div>
                    <div className="flex items-center gap-1 text-blue-400 text-[12px] font-medium mt-auto opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <span>Learn more</span>
                        <IoArrowForward size={13} />
                    </div>
                </div>

                {/* Card 2 */}
                <div className="flex-1 min-w-[220px] max-w-[280px] px-5 py-5 bg-gray-800/60 border border-gray-700 rounded-2xl flex flex-col items-start gap-3 hover:border-red-500/50 hover:bg-gray-800 hover:scale-[1.03] transform transition-all duration-300 cursor-pointer group">
                    <div className="p-2 bg-red-900/60 border border-red-700/40 rounded-xl group-hover:bg-red-900 transition-all duration-300">
                        <FaUserFriends className="text-red-300 text-[22px]" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="text-gray-100 font-semibold text-[14px] sm:text-[15px]">Connect with people</p>
                        <p className="text-gray-400 text-[12px] sm:text-[13px] leading-relaxed">
                            Discover and connect with people who share your interests.
                        </p>
                    </div>
                    <div className="flex items-center gap-1 text-red-400 text-[12px] font-medium mt-auto opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <span>Learn more</span>
                        <IoArrowForward size={13} />
                    </div>
                </div>

                {/* Card 3 */}
                <div className="flex-1 min-w-[220px] max-w-[280px] px-5 py-5 bg-gray-800/60 border border-gray-700 rounded-2xl flex flex-col items-start gap-3 hover:border-green-500/50 hover:bg-gray-800 hover:scale-[1.03] transform transition-all duration-300 cursor-pointer group">
                    <div className="p-2 bg-green-900/60 border border-green-700/40 rounded-xl group-hover:bg-green-900 transition-all duration-300">
                        <MdLockOpen className="text-green-300 text-[22px]" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="text-gray-100 font-semibold text-[14px] sm:text-[15px]">Secure & private</p>
                        <p className="text-gray-400 text-[12px] sm:text-[13px] leading-relaxed">
                            End-to-end encryption keeps your conversations private.
                        </p>
                    </div>
                    <div className="flex items-center gap-1 text-green-400 text-[12px] font-medium mt-auto opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <span>Learn more</span>
                        <IoArrowForward size={13} />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Body;