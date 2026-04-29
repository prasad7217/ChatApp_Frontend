import { configureStore } from "@reduxjs/toolkit";
import userProfileReducer from "./userSlices/userSlice";
import adminProfileReducer from "./adminSlices/adminSlices";
import userOtpReducer from "./userSlices/userOtpSlice";

const appStore = configureStore({
    reducer:{
        user: userProfileReducer,
        admin: adminProfileReducer,
        otp: userOtpReducer
    }
});

export default appStore;