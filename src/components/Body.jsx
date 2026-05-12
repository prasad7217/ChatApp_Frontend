import React from "react";
import { messages } from "./utils/defaults";
import { IoArrowForward, IoCheckmarkCircleOutline, IoPlayCircleOutline } from "react-icons/io5";
import { BsChatSquareText } from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";
import { MdLockOpen } from "react-icons/md";

const Body = () => {
    return (
        <div className="min-h-screen w-full bg-[#1a1f2b] overflow-x-hidden">
    {/* Main Container: Centered max-width wrapper */}
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 lg:px-12 flex flex-col gap-16 md:gap-24">
        
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-8">
                
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-green-900/30 border border-green-800/50 text-green-400 font-medium px-4 py-1.5 rounded-full">
                    <IoCheckmarkCircleOutline size={18} className="shrink-0" />
                    <span className="text-xs sm:text-sm tracking-wide">Real-time messaging</span>
                </div>

                {/* Heading */}
                <div className="space-y-2">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-white">
                        Connect, Chat & <br />
                        <span className="text-red-500">Stay Together</span>
                    </h1>
                </div>

                {/* Description */}
                <p className="text-base sm:text-lg text-gray-400 leading-relaxed max-w-lg">
                    A modern social platform to meet new people, share moments, and chat in real-time — without limits.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                    <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 active:scale-95 text-white text-sm sm:text-base font-semibold px-8 py-3 rounded-full transition-all cursor-pointer shadow-lg shadow-red-900/20">
                        <span>Get started free</span>
                        <IoArrowForward size={18} />
                    </button>
                    <button className="flex items-center gap-2 border border-gray-600 hover:border-gray-400 hover:bg-gray-800/50 active:scale-95 text-gray-300 text-sm sm:text-base font-semibold px-8 py-3 rounded-full transition-all cursor-pointer">
                        <span>Learn more</span>
                        <IoPlayCircleOutline size={20} />
                    </button>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-8 pt-4">
                    <div className="text-left">
                        <p className="text-2xl sm:text-3xl font-bold text-white">12K+</p>
                        <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-wider font-medium">Active users</p>
                    </div>
                    <div className="w-[1px] h-10 bg-gray-700"></div>
                    <div className="text-left">
                        <p className="text-2xl sm:text-3xl font-bold text-white">98%</p>
                        <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-wider font-medium">Uptime</p>
                    </div>
                    <div className="w-[1px] h-10 bg-gray-700"></div>
                    <div className="text-left">
                        <p className="text-2xl sm:text-3xl font-bold text-white">50ms</p>
                        <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-wider font-medium">Latency</p>
                    </div>
                </div>
            </div>

            {/* Right Content: Chat Mockup */}
            <div className="relative flex justify-center lg:justify-end">
                {/* Decorative background glow */}
                <div className="absolute inset-0 bg-blue-500/10 blur-[100px] rounded-full"></div>
                
                <div className="relative w-full max-w-[350px] bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden transform lg:rotate-8 hover:rotate-0 transition-transform duration-500">
                    {/* Header */}
                    <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100 bg-gray-50/50">
                        <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white text-xs font-bold">
                            GC
                        </div>
                        <div>
                            <p className="text-sm font-bold text-gray-900">Group Chat</p>
                            <p className="text-[11px] text-green-500 font-medium flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                4 online
                            </p>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex flex-col gap-4 p-5 h-[300px] overflow-y-auto">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex flex-col ${msg.type === "sent" ? "items-end" : "items-start"}`}>
                                <div className={`px-4 py-2.5 text-sm max-w-[85%] shadow-sm ${
                                    msg.type === "sent"
                                    ? "bg-red-600 text-white rounded-2xl rounded-tr-none"
                                    : "bg-gray-100 text-gray-800 rounded-2xl rounded-tl-none"
                                }`}>
                                    {msg.text}
                                </div>
                                <span className="text-[10px] text-gray-400 mt-1 px-1">{msg.time}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature Cards Refactored to use Grid */}
            {[
                { title: "Real-time chat", desc: "Instant messaging with live delivery status.", icon: <BsChatSquareText />, color: "blue" },
                { title: "Connect with people", desc: "Discover and connect with people who share your interests.", icon: <FaUserFriends />, color: "red" },
                { title: "Secure & private", desc: "End-to-end encryption keeps your conversations private.", icon: <MdLockOpen />, color: "green" }
            ].map((feature, idx) => (
                <div key={idx} className="group p-8 bg-gray-800/40 border border-gray-700/50 rounded-3xl hover:bg-gray-800 hover:border-gray-500 transition-all duration-300 cursor-pointer">
                    <div className={`w-12 h-12 flex items-center justify-center rounded-2xl mb-6 bg-${feature.color}-900 text-${feature.color}-400 group-hover:scale-110 transition-transform`}>
                        {feature.icon}
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6">{feature.desc}</p>
                    <div className={`flex items-center gap-2 text-${feature.color}-400 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity`}>
                        <span>Learn more</span>
                        <IoArrowForward />
                    </div>
                </div>
            ))}
        </div>
    </div>
</div>
    )
}

export default Body;