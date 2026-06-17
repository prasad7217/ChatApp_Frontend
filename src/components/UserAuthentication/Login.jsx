import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { addUserOtp } from "../Redux/userSlices/userOtpSlice";
import { BASE_URL } from "../../Constants";
import { formateTime, formateTime12 } from "../utils/helpers";
import toast from "../utils/toast";
// import toast from "../utils/toast";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [spin, setSpin] = useState(false);
    const [showToast, setShowToast] = useState(false);


    const navigate = useNavigate();
    const dispatch = useDispatch();

    const reqLogin = async () => {
        setSpin(true)
        try {

            const res = await axios.post(BASE_URL + "/login", {
                email,
                password
            }, { withCredentials: true });
            console.log("login :", res)
            if (res?.data?.success) {
                dispatch(addUserOtp(res?.data));
                setSpin(false);
                setShowToast(true);
                // toast(showToast, )
                navigate("/otp", {
                    state: {
                        message: res?.data?.message
                    }
                });
            }

        } catch (error) {
            // console.log("errorr :", error.response)
            if (error.response.data.message.split(",")[0] === "Too many requests") {
                const timestamp = error.response.data.message.split(",")[1].split(".")[1];
                const remainingTime = Date.now() - new Date(timestamp).getTime();

                if (remainingTime >= 0) return;

                const hoursLeft = Math.ceil(Math.abs(remainingTime) / 3600000);
                const errorTime = error.response.data.message.split(".")[0] + ". " + String(hoursLeft) + " " + "Hours";

                setErrorMsg(errorTime);
                setSpin(false)

                setTimeout(() => {
                    setErrorMsg("");
                }, 5000)
                return
            };
            setSpin(false)
            setErrorMsg(error.response.data.message)
        }
    }

    // useEffect(() => {



    //     return () => {
    //         clearTimeout(timerId)
    //     }

    // }, [])

    const handleShowPass = () => {
        setShowPass(!showPass);
    }

    return (
        <div className="w-full bg-[#4A4A4A] flex items-center justify-center pt-12 py-8 ">
            <div className="min-h-[77vh] xl:min-h-[55vh] 2xl:min-h-[78vh] flex items-center justify-center px-4">
                <div className="xl:w-[420px] lg:w-[420px] md:w-[400px] w-[350px] max-w-md p-8 space-y-6 rounded-2xl bg-[#2A2A2A] shadow-2xl border border-slate-700/50 lg:my-4">
                    <div className="space-y-2 text-center">
                        <h1 className="text-3xl font-bold tracking-tight text-white">Welcome back</h1>
                        <p className="text-sm text-slate-400">Please enter your details to login</p>
                    </div>
                    {errorMsg && (
                        <div className="flex items-start gap-2.5 mb-4 px-3.5 py-2.5 rounded-lg border border-red-500/40 bg-red-500/10">
                            <svg className="w-[18px] h-[18px] text-red-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                            </svg>
                            <p className="text-sm text-red-400 leading-snug">{errorMsg}</p>
                        </div>
                    )}
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none text-slate-200">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@company.com"
                                className="flex h-12 w-full rounded-3xl border border-slate-700 bg-[#3A3A3A] px-4 py-2 text-white placeholder:text-slate-500 focus:outline-none focus:border-red-600 transition-all"
                            />
                        </div>

                        <div className="space-y-2 relative">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium leading-none text-slate-200">Password</label>
                                <Link to={"/reset/password"}><p className="text-xs text-red-400 hover:underline" >Forgot password?</p></Link>
                            </div>
                            <input
                                type={showPass ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="*****"
                                className="flex h-12 w-full rounded-3xl border border-slate-700 bg-[#3A3A3A] px-4 py-2 text-white placeholder:text-slate-500 focus:outline-none focus:border-red-600 transition-all"
                            />
                            <div className="absolute xl:top-[38px] lg:top-[36px] md:top-[36px] top-[36px] right-4 xl:right-4 text-[20px] text-white cursor-pointer" onClick={() => handleShowPass()}>
                                {showPass ? <BsEyeSlash /> : <BsEye />}
                            </div>
                        </div>

                        <button className="w-full h-12 rounded-3xl bg-red-600 px-4 py-2 text-[16px] font-semibold text-white shadow transition-all hover:bg-red-600/80 active:scale-[0.98] cursor-pointer" onClick={() => reqLogin()}>
                            {spin ? <span className="animate-spin rounded-full border-4 border-gray-400 border-t-white"
                                style={{ width: '20px', height: '20px', display: 'inline-block' }}></span> : "Login"}
                        </button>
                    </div>

                    <p className="text-center text-sm text-slate-400">
                        Don't have an account? <Link to={"/signup"}><span className="text-red-400 hover:underline">Sign up</span></Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login;