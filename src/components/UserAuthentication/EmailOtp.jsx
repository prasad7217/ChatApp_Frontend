import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUserProfile } from "../Redux/userSlice";

const EmailOtp = () => {

  const OTP_DIGITCOUNT = 6;

  const [inputArr, setInputArr] = useState(new Array(OTP_DIGITCOUNT).fill(""));
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const inputRef = useRef([]);

  const handleInput = (value, index) => {

    if (isNaN(value)) return;

    const newArr = [...inputArr];
    const newValue = value.trim();
    newArr[index] = newValue.slice(-1);

    setInputArr(newArr);

    newValue && inputRef.current[index + 1]?.focus();

  }

  useEffect(() => {

    inputRef.current[0]?.focus();

  }, [])

  const handleBackspace = (e, index) => {

    if (e.key === "Backspace") {
      !e.target.value && inputRef.current[index - 1]?.focus();
    }

  }

  const otpString = inputArr.join("");

  const sentOtp = async () =>{
    try {
      const res = await axios.post("http://localhost:7777/api/otp_verify", {
        email: "durgaprasadkasa81@gmail.com",
        otp: otpString
      }, {withCredentials: true});

      if(res?.data?.success){
        const res1 = await axios.get("http://localhost:7777/api/profile", {withCredentials: true});
        if(res1?.data?.success){
          dispatch(addUserProfile(res1?.data?.data))
          navigate(`/profile`)
        }
      }
    } catch (error) {
      
    }
  }

  return (
    <div className="xl:min-h-[86vh] min-h-[85vh] lg:min-h-[85vh] w-full flex items-center justify-center px-6 bg-gray-700">

      <div className="w-full max-w-md bg-gray-800 shadow-2xl rounded-2xl p-6 sm:p-8 space-y-4">

        {/* Header */}
        <div className="flex flex-col items-center justify-center text-center mb-8">
          <h1 className="text-xl sm:text-2xl font-semibold text-white">
            OTP Validation
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            OTP has been sent to : { }
          </p>
        </div>

        {/* OTP Inputs */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-8">
          {inputArr.map((value, index) => {
            return (
              <input 
                key={index}
                type="text"
                value={value}
                ref={(value) => inputRef.current[index] = value}
                onChange={(e) => handleInput(e.target.value, index)}
                onKeyDown={(e) => handleBackspace(e, index)}
                className=" w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-center text-lg sm:text-xl text-white md:text-2xl font-semibold border border-gray-300 rounded-lg shadow-sm outline-none transition-all duration-200 focus:border-red-600 focus:ring-2 focus:ring-red-600"
              />
            );
          })}
        </div>

        {/* Resend Section */}
        <div className="flex items-center justify-center gap-2 text-center">
          <p className="text-xs sm:text-sm text-gray-400">
            Didn’t receive the OTP?
          </p>

          <button
            className="
          text-red-400 font-medium text-xs sm:text-sm hover:text-red-400/80 hover:underline transition duration-200 disabled:text-gray-400 disabled:cursor-not-allowed"
          >
            Resend OTP
          </button>
        </div>
        <button onClick={sentOtp} className="w-full py-2 rounded-xl font-semibold cursor-pointer text-center bg-red-600 text-white text-[16px] hover:bg-red-600/80 transition-all duration-500 ease">Verify</button>

      </div>
    </div>
  );
};
export default EmailOtp;
