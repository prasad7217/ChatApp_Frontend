import { configureStore } from "@reduxjs/toolkit";
import userProfileReducer from "./userSlices/userSlice";
import adminProfileReducer from "./adminSlices/adminSlices";

const appStore = configureStore({
    reducer:{
        user: userProfileReducer,
        admin: adminProfileReducer
    }
});

export default appStore;