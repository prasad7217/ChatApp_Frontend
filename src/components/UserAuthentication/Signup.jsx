import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const SignUp = () => {

    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [bio, setBio] = useState("");
    const [profilePic, setProfilePic] = useState("");

    const sentSignup = async () => {

        const res = await axios.post("http://localhost:7777/api/signup", {
            userName,
            email,
            password,
            bio,
            profilePic,
        }, { withCredentials: true })

        console.log("res", res)

    }

    return (
        <div className="flex items-center justify-center bg-gray-700 p-4">
            <div className="w-full max-w-lg p-8 space-y-2 bg-gray-800 rounded-3xl shadow-2xl my-8 xl:my-16">
                {/* Header */}
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-white">Create Account</h1>
                    <p className="text-slate-400">Join our community and start building</p>
                </div>

                <div className="space-y-3">
                    {/* Profile Pic Upload Section */}
                    <div className="flex flex-col items-center justify-center space-y-3">
                        <div className="relative w-24 h-24 rounded-full border-2 border-dashed border-slate-500 bg-slate-800/50 flex items-center justify-center overflow-hidden group cursor-pointer hover:border-red-500 transition-colors">
                            <span className="text-slate-500 group-hover:text-red-400 text-xs text-center px-2">Upload Photo</span>
                            <input type="file" value={profilePic} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" onChange={(e) => setProfilePic(e.target.value)} />
                        </div>
                    </div>

                    {/* Grid for Name & Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-slate-200 ml-1">Username</label>
                            <input
                                onChange={(e) => setUserName(e.target.value)}
                                value={userName}
                                type="text"
                                placeholder="johndoe"
                                className="w-full h-12 rounded-xl bg-[#1e293b]/50 border border-slate-600 px-4 text-white focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-slate-200 ml-1">Email</label>
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                value={email}
                                placeholder="name@company.com"
                                className="w-full h-12 rounded-xl bg-[#1e293b]/50 border border-slate-600 px-4 text-white focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-slate-200 ml-1">Password</label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            value={password}
                            placeholder="*****"
                            className="w-full h-12 rounded-xl bg-[#1e293b]/50 border border-slate-600 px-4 text-white focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all"
                        />
                    </div>

                    {/* Bio Field */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-slate-200 ml-1">Bio</label>
                        <textarea
                            onChange={(e) => setBio(e.target.value)}
                            placeholder="Tell us a bit about yourself..."
                            rows="3"
                            value={bio}
                            className="w-full rounded-xl bg-[#1e293b]/50 border border-slate-600 p-4 text-white focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all resize-none"
                        ></textarea>
                    </div>

                    {/* Submit */}
                    <button className="w-full h-10 rounded-xl bg-red-600 px-2 py-1 text-[16px] font-bold text-white shadow-lg transition-all hover:bg-red-500 active:scale-[0.98] cursor-pointer" onClick={sentSignup}>
                        Sign Up
                    </button>
                </div>

                <p className="text-center text-sm text-slate-400">
                    Already have an account? <Link to={"/login"}><span className="text-red-400 text-[16px] hover:underline">Sign In</span></Link>
                </p>
            </div>
        </div>
    )
}

export default SignUp;