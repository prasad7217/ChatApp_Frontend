import React, { useState } from "react";

const EmailOtp = () => {
  const OTP_DIGITCOUNT = 4;

  const [inputArr, setInputArr] = useState(new Array(OTP_DIGITCOUNT).fill("1"));

  return (
    <div className="lg:min-h-[80vh] w-full flex items-center justify-center">
      <div className="w-[450px] h-[55vh] shadow-2xl rounded-2xl p-8">
        <div className="w-full h-[25%] flex flex-col items-center justify-center">
          <h1 className="text-[24px] font-semibold text-white">
            OTP Validation
          </h1>
          <p className="text-gray-400">Otp has sent to :{}</p>
        </div>
        <div className="w-full h-[50%] flex items-center justify-center gap-4">
          {inputArr.map((input, index) => {
            return (
              <input
                className="w-12 h-12 text-center text-[28px] font-semibold border border-gray-300 rounded-lg shadow-sm outline-none transition-all duration-200 focus:border-red-600 focus:ring-2 focus:ring-red-600"
                key={index}
                type="text"
                value={input[index]}
                onChange={(e) => handleInput(e.target.value, index)}
              />
            );
          })}
        </div>
        <div className="w-full h-[25%] flex items-center justify-center gap-2">
          <p className="text-sm text-gray-400">Didn’t receive the OTP?</p>

          <button
            className=" text-red-600 font-medium text-sm hover:text-red-600/80 hover:underline transition duration-200 disabled:text-gray-400 disabled:cursor-not-allowed"
          >
            Resend OTP
          </button>
        </div>
      </div>
    </div>
  );
};
export default EmailOtp;
