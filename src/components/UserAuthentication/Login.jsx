import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {

    const [email, setEmail] = useState("durgaprasadkasa81@gmail.com");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const reqLogin = async () => {

        const res = await axios.post("http://localhost:7777/api/login", {
            email,
            password
        }, { withCredentials: true });

        console.log("res :", res)

        if(res?.data?.success){
            navigate("/otp")
        }

    }

    return (
        <div className="w-full bg-gray-700 flex items-center justify-center mt-12 py-8 xl:my-24">
            <div className="flex items-center justify-center ">
                <div className="w-[420px] max-w-md p-8 space-y-6 rounded-2xl bg-gray-800 shadow-2xl border border-slate-700/50 lg:my-20">
                    <div className="space-y-2 text-center">
                        <h1 className="text-3xl font-bold tracking-tight text-white">Welcome back</h1>
                        <p className="text-sm text-slate-400">Please enter your details to login</p>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none text-slate-200">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@company.com"
                                className="flex h-12 w-full rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2 text-white placeholder:text-slate-500 focus:outline-none focus:border-red-600 transition-all"
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium leading-none text-slate-200">Password</label>
                                <a href="#" className="text-xs text-red-400 hover:underline">Forgot password?</a>
                            </div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="*****"
                                className="flex h-12 w-full rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2 text-white placeholder:text-slate-500 focus:outline-none focus:border-red-600 transition-all"
                            />
                        </div>

                        <button className="w-full h-12 rounded-lg bg-red-600 px-4 py-2 text-[16px] font-semibold text-white shadow transition-all hover:bg-red-600/80 active:scale-[0.98] cursor-pointer" onClick={() => reqLogin()}>
                            Login
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