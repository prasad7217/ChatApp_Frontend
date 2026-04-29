import { createSlice } from "@reduxjs/toolkit";
import { defaultSerializeQueryArgs } from "@reduxjs/toolkit/query";

const userOtpSlice = createSlice({
    name: "otp",
    initialState: {
        userOtp: null
    },
    reducers: {
        addUserOtp: (state, action) => {
            state.userOtp = action.payload;
        }
    }
})

export const { addUserOtp } = userOtpSlice.actions;

export default userOtpSlice.reducer;