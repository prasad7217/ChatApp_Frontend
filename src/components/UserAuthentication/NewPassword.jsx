import axios from "axios";
import { useState } from "react";
import {
    MdLockReset,
    MdLock,
    MdOutlineVisibility,
    MdOutlineVisibilityOff,
    MdArrowBack,
    MdCheckCircle,
    MdSecurity,
} from "react-icons/md";
import { MdLockPerson } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {

    const navigate = useNavigate();

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const resetPassword = async () => {

        if (newPassword !== confirmPassword) {
            setError("Confirm password should be same as the new password.");
            return;
        }

        const res = await axios.post("http://localhost:7777/api/reset-password/new", { password: confirmPassword }, { withCredentials: true })

        console.log("new :", res)

    }

    return (

        <div className="xl:h-[86vh] lg:h-[85vh] md:h-[85vh] h-[80vh] bg-gray-700 flex items-center justify-center p-6 font-sans">

            <div className="w-full max-w-md bg-gray-800 backdrop-blur-xl border border-[#2b3548] rounded-[32px] p-6 shadow-2xl z-0">

                {/* Top Icon */}
                <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-3">
                    <MdLockPerson className="text-[#ff375f]" size={40} />
                </div>

                {/* Heading */}
                <h1 className="text-white text-2xl font-bold text-center mb-3">
                    Set New Password
                </h1>

                <p className="text-[#94a3b8] text-sm text-center leading-relaxed mb-4">
                    Enter your new password below.
                    Make sure it's strong and secure.
                </p>

                {/* Warning Box */}
                <div className="bg-red-500/5 border border-red-500/20 rounded-2xl px-4 py-2 flex gap-3 mb-6">

                    <div className="mt-0.5">
                        <MdSecurity className="text-[#ff375f]" size={20} />
                    </div>

                    <p className="text-[#cbd5e1] text-sm leading-relaxed">
                        For your security, don’t use a password you’ve used before.
                    </p>

                </div>

                {/* New Password */}
                <div className="mb-6">

                    <label className="text-white text-sm font-medium mb-1 flex items-center gap-2">
                        <MdLock className="text-[#94a3b8]" />
                        New Password
                    </label>

                    <div className="relative">

                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter new password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full bg-gray-800 border border-[#263041] rounded-2xl px-4 py-2.5 pr-14 text-white placeholder-[#475569] outline-none focus:border-red-600 transition-all duration-200"
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94a3b8]"
                        >
                            {
                                showPassword
                                    ? <MdOutlineVisibilityOff size={22} />
                                    : <MdOutlineVisibility size={22} />
                            }
                        </button>

                    </div>

                </div>

                {/* Password Strength */}
                {/* <div className="mb-5">

                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-[#cbd5e1]">
                            Password Strength
                        </span>

                        <span className="text-sm text-[#ff375f] font-semibold">
                            Weak
                        </span>
                    </div>

                    <div className="flex gap-2">

                        <div className="h-2 flex-1 rounded-full bg-[#ff375f]"></div>
                        <div className="h-2 flex-1 rounded-full bg-[#243041]"></div>
                        <div className="h-2 flex-1 rounded-full bg-[#243041]"></div>
                        <div className="h-2 flex-1 rounded-full bg-[#243041]"></div>

                    </div>

                </div> */}

                {/* Confirm Password */}
                <div className="mb-4">

                    <label className="text-white text-sm font-medium mb-1 flex items-center gap-2">
                        <MdLock className="text-[#94a3b8]" />
                        Confirm Password
                    </label>

                    <div className="relative">

                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm new password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full bg-gray-800 border border-[#263041] rounded-2xl px-4 py-2.5 pr-14 text-white placeholder-[#475569] outline-none focus:border-red-600 transition-all duration-200"
                        />

                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94a3b8]"
                        >
                            {
                                showConfirmPassword
                                    ? <MdOutlineVisibilityOff size={22} />
                                    : <MdOutlineVisibility size={22} />
                            }
                        </button>

                    </div>

                </div>

                {/* Password Rules */}
                {/* <div className="bg-green-500/5 border border-green-500/20 rounded-2xl p-5 space-y-3 mb-4">

                    <div className="flex items-center gap-3 text-[#d1fae5] text-sm">
                        <MdCheckCircle className="text-green-400" size={20} />
                        At least 8 characters long
                    </div>

                    <div className="flex items-center gap-3 text-[#d1fae5] text-sm">
                        <MdCheckCircle className="text-green-400" size={20} />
                        Include uppercase & lowercase letters
                    </div>

                    <div className="flex items-center gap-3 text-[#d1fae5] text-sm">
                        <MdCheckCircle className="text-green-400" size={20} />
                        Include at least one number
                    </div>

                    <div className="flex items-center gap-3 text-[#d1fae5] text-sm">
                        <MdCheckCircle className="text-green-400" size={20} />
                        Include at least one special character
                    </div>

                </div> */}

                {/* Button */}
                <button
                    onClick={resetPassword}
                    className="w-full bg-red-600 hover:bg-red-600/80 active:scale-[0.98] text-white font-semibold rounded-2xl py-2.5 transition-all duration-200 shadow-lg shadow-red-500/20"
                >
                    Reset Password
                </button>

                {/* Back */}
                <div
                    onClick={() => navigate("/login")}
                    className="flex items-center justify-center gap-2 text-[#94a3b8] hover:text-[#ff375f] mt-4 cursor-pointer transition-colors duration-200"
                >
                    <MdArrowBack size={18} />
                    Back to Login
                </div>

            </div>

        </div>
    );
};

export default ResetPassword;