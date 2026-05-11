import axios from "axios";
import { useState } from "react";
import { MdEmail, MdLockOpen, MdInfo, MdSend, MdArrowBack } from "react-icons/md";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addUserOtp } from "../Redux/userSlices/userOtpSlice";

const ForgotPassword = () => {
    const [email, setEmail] = useState("durgaprasadkasa81@gmail.com");
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleResetPass = async () => {

        try {

            const res = await axios.post("http://localhost:7777/api/reset-password", { email }, { withCredentials: true });

            if (res?.data?.success) {
                dispatch(addUserOtp(res?.data));
                navigate("/otp")
            }

        } catch (error) {
            console.log("Error :", error)
        }

    }


    return (
        <div className="xl:h-[86vh] lg:h-[85vh] md:h-[85vh] h-[75vh] bg-gray-700 flex items-center justify-center p-8 font-sans">
            <div className="bg-[#161d2e] rounded-2xl p-10 w-full max-w-sm">

                <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-3">
                    <MdLockOpen size={28} className="text-[#e8344a]" />
                </div>

                <h1 className="text-white text-2xl font-bold text-center mb-2">
                    Forgot your password?
                </h1>
                <p className="text-[#7a8499] text-sm text-center leading-relaxed mb-6">
                    No worries! Enter your registered email address and we'll send you a
                    link to reset your password.
                </p>

                <div className="bg-red-500/5 border border-red-500/20 rounded-xl px-4 py-3 flex items-start gap-3 mb-6">
                    <MdInfo size={18} className="text-[#e8344a] flex-shrink-0 mt-0.5" />
                    <p className="text-[#9aa3b8] text-xs leading-relaxed">
                        The reset link will expire in{" "}
                        <strong className="text-[#c8cdd8]">15 minutes</strong>. Check your
                        spam folder if you don't see it.
                    </p>
                </div>

                <div className="mb-5">
                    <div className="flex items-center gap-1.5 mb-2">
                        <MdEmail size={16} className="text-[#7a8499]" />
                        <span className="text-[#c8cdd8] text-sm font-medium">
                            Email Address
                        </span>
                    </div>
                    <input
                        type="email"
                        placeholder="name@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full bg-[#0f1623] border border-[#252e42] rounded-xl px-4 py-3 text-[#e2e6f0] text-sm placeholder-[#3d4860] outline-none focus:border-[#e8344a] transition-colors duration-200"
                    />
                </div>
                <button
                    className="w-full bg-[#e8344a] hover:bg-[#c9283d] active:scale-95 text-white font-semibold text-sm rounded-xl py-3.5 flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer" onClick={handleResetPass}
                >
                    <MdSend size={18} />
                    Send Reset Link
                </button>

                <hr className="border-t border-[#1e2840] my-6" />

                <Link to={ "/login" }><div
                    onClick={() => navigate("/login")}
                    className="flex items-center justify-center gap-1.5 text-[#7a8499] hover:text-[#e8344a] text-sm cursor-pointer transition-colors duration-200"
                >
                    <MdArrowBack size={16} />
                    Back to Login
                </div>
                </Link>
            </div>
        </div>
    );
};

export default ForgotPassword;
