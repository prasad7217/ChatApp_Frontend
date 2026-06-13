import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUserProfile } from "../Redux/userSlices/userSlice";
import { formateTime, maskedEmail } from "../utils/helpers";
import { FaRegClock } from "react-icons/fa6";
import { addUserOtp } from "../Redux/userSlices/userOtpSlice";
import { BASE_URL } from "../../Constants";
import { addAllUsers } from "../Redux/userSlices/allUserSlice";

const EmailOtp = () => {

  const OTP_DIGITCOUNT = 4;

  const [inputArr, setInputArr] = useState(new Array(OTP_DIGITCOUNT).fill(""));
  const [isReady, setIsReady] = useState();
  const [timer, setTimer] = useState();


  const navigate = useNavigate();
  const dispatch = useDispatch();

  const otpRes = useSelector((store) => store?.otp);

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

    if (otpRes === null || otpRes === undefined) navigate("/login"); // wait for redux

    setIsReady(true);

    setTimeout(() => {
      inputRef.current[0]?.focus(); // wait for re-render
    }, 100);

    if (!otpRes?.data?.otpExpiry) return;

    const otpExpiryTime = otpRes?.data?.otpExpiry;

    const reminigTime = Math.floor((otpExpiryTime - Date.now()) / 1000);
    // const reminigTime = 10
    setTimer(reminigTime);

    const timerId = setInterval(() => {

      setTimer((pre) => {
        if (pre <= 1) {
          clearInterval(timerId);
          return 0;
        }
        return pre - 1;
      });

    }, 1000)

    return () => clearInterval(timerId);

  }, [otpRes?.data?.otpExpiry])

  const handleBackspace = (e, index) => {

    if (e.key === "Backspace") {
      !e.target.value && inputRef.current[index - 1]?.focus();
    }

    if (e.key === "Enter") {
      sentOtp();
    }
  }

  const otpString = inputArr.join("");

  const sentOtp = async () => {

    if (otpRes?.data?.mode === "Reset-password") {

      try {

        const res = await axios.post(BASE_URL + "/reset-password/verify", { otp: otpString }, { withCredentials: true })

        if (res?.data?.success) {
          navigate('/reset/password/new')
        }

      } catch (error) {
        console.log("NEW :", error)
      }

    } else {

      try {

        const res = await axios.post(BASE_URL + "/otp_verify", {
          email: otpRes?.data?.email,
          otp: otpString
        }, { withCredentials: true });

        if (res?.data?.success) {

          const res1 = await axios.get(BASE_URL + "/profile", { withCredentials: true });
          if (res1?.data?.success) {
            dispatch(addUserProfile(res1?.data?.data))

            const allRes = await axios.get(BASE_URL + "/allusers", { withCredentials: true });

            dispatch(addAllUsers(allRes?.data?.suggestions))

            navigate(`/feed`)
          }
        }

      } catch (error) {
        console.log("Email :", error)
      }

    }
  }

  const handleResendOtp = async () => {

    const res = await axios.post(BASE_URL + "/resend/otp", { email: otpRes?.data?.email }, { withCredentials: true })

    if (res?.data?.success) {
      dispatch(addUserOtp(res?.data))
    }

  }

  if (!isReady) return null;

  return (
    <div className="xl:min-h-[86vh] min-h-[86vh] lg:min-h-[85vh] w-full flex items-center justify-center px-6 bg-[#4a4a4a]">

      <div className="w-full max-w-md bg-[#2a2a2a] shadow-2xl rounded-2xl p-6 sm:p-8 space-y-4">

        {/* Header */}
        <div className="flex flex-col items-center justify-center text-center mb-8">
          <h1 className="text-xl sm:text-2xl font-semibold text-white">
            OTP Validation
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            OTP has been sent to : <span className="text-red-400 text-[16px] font-semibold">{maskedEmail(otpRes?.data?.email)}</span>
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
            onClick={handleResendOtp}
            disabled={timer > 0}
            className="
          text-red-400 font-medium text-xs sm:text-sm hover:text-red-400/90 hover:underline transition duration-200 disabled:text-gray-400 disabled:cursor-not-allowed cursor-pointer"
          >
            Resend OTP
          </button>
        </div>
        {timer > 0 && <div className="w-full flex items-center justify-center text-gray-400 text-[14px] gap-2">
          <FaRegClock />
          <div>
            <span>Resend OTP in : </span><span className="text-[16px] text-red-400 font-semibold">{formateTime(timer)}</span>
          </div>
        </div>}
        <button onClick={sentOtp} className="w-full py-2 rounded-xl font-semibold cursor-pointer text-center bg-red-600 text-white text-[16px] hover:bg-red-600/80 transition-all duration-500 ease">Verify</button>
      </div>
    </div>
  );
};
export default EmailOtp;
