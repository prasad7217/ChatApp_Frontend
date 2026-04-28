import React, { useState } from "react";
import { BsPersonFillLock } from "react-icons/bs";
import { RiAdminFill } from "react-icons/ri";
import { MdOutlineLockPerson } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addAdminProfile } from "../../Redux/adminSlices/adminSlices";

const AdminLogin = () => {

    const [email, setEmail] = useState("admin@gmail.com");
    const [password, setPassword] = useState("Admin@123");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async () => {

        const res = await axios.post("http://localhost:7777/api/admin/login", {
            email,
            password
        }, { withCredentials: true });
        // console.log(res)
        if (res?.data?.status === "success") {
            const adminProfile = await axios.get("http://localhost:7777/api/admin/profile", { withCredentials: true })

            if (adminProfile?.data?.success) {
                dispatch(addAdminProfile(addAdminProfile?.data?.data))
                navigate(`/admin/dashboard`);
            }
        }
    }

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black flex items-center justify-center px-4">

            <div className="w-[380px] max-w-md p-8 rounded-2xl bg-slate-900/70 backdrop-blur-xl border border-slate-700 shadow-[0_0_40px_rgba(0,0,0,0.6)]">

                {/* Header */}
                <div className="text-center mb-6">
                    <h2 className="text-red-500 text-sm tracking-widest uppercase">Admin Panel</h2>
                    <div className="flex items-center justify-center gap-3">
                        <BsPersonFillLock className="text-3xl text-white" />
                        <h1 className="text-3xl font-bold text-white mt-1">Secure Login</h1>
                    </div>
                    <p className="text-slate-400 text-sm mt-1">Authorized access only</p>
                </div>

                {/* Form */}
                <div className="space-y-5">

                    {/* Email */}
                    <div>
                        <div className="flex items-center gap-2">
                            <RiAdminFill className="text-sm text-slate-300" />
                            <label className="text-sm text-slate-300">Admin Email</label>
                        </div>
                        <input
                            type="email"
                            placeholder="admin@company.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 w-full h-11 rounded-md bg-slate-800 border border-slate-700 px-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                        />
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <div className="flex justify-between">
                            <div className="flex items-center gap-2">
                                <MdOutlineLockPerson className="text-sm text-slate-300" />
                                <label className="text-sm text-slate-300">Password</label>
                            </div>
                            <a href="#" className="text-xs text-red-500 hover:underline">
                                Reset
                            </a>
                        </div>

                        <input
                            type="password"
                            placeholder="Enter secure password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 w-full h-11 rounded-md bg-slate-800 border border-slate-700 px-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                        />

                        <div
                            className="absolute right-3 top-[38px] text-lg text-slate-400 cursor-pointer"

                        >
                        </div>
                    </div>

                    {/* Login Button */}
                    <button
                        className="w-full h-11 bg-red-600 hover:bg-red-600/80 text-white font-semibold rounded-md transition-all active:scale-95 shadow-lg shadow-indigo-900/40" onClick={handleLogin}
                    >
                        Access Dashboard
                    </button>
                </div>

                {/* Footer */}
                <p className="text-center text-xs text-slate-500 mt-6">
                    Restricted system • Unauthorized access prohibited
                </p>
            </div>
        </div>
    )
}

export default AdminLogin;