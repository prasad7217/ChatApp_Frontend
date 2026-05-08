import { createSlice } from "@reduxjs/toolkit";
import { defaultSerializeQueryArgs } from "@reduxjs/toolkit/query";

const userOtpSlice = createSlice({
    name: "otp",
    initialState: null,
    reducers: {
        addUserOtp: (state, action) => {
            return action.payload;
        }
    }
})

export const { addUserOtp } = userOtpSlice.actions;

export default userOtpSlice.reducer;