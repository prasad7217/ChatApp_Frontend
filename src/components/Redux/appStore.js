import { configureStore } from "@reduxjs/toolkit";
import userProfileReducer from "./userSlices/userSlice";
import adminProfileReducer from "./adminSlices/adminSlices";
import userOtpReducer from "./userSlices/userOtpSlice";
import allUserReducer from "./userSlices/allUserSlice";

const appStore = configureStore({
    reducer: {
        user: userProfileReducer,
        admin: adminProfileReducer,
        otp: userOtpReducer,
        allUsers: allUserReducer
    }
});

export default appStore;