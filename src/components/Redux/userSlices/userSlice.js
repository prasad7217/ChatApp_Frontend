import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        profile: null
    },
    reducers: {
        addUserProfile: (state, action) => {
            state.profile = action.payload;
        },
        clearUserProfile: (state, action) =>{
            state.profile = null;
        }
    }
})

export const { addUserProfile, clearUserProfile } = userSlice.actions;

export default userSlice.reducer;