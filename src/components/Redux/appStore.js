import { configureStore } from "@reduxjs/toolkit";
import userProfileReducer from "./userSlice";

const appStore = configureStore({
    reducer:{
        user: userProfileReducer
    }
});

export default appStore;