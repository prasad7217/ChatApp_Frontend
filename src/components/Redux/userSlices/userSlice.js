import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        profile: null
    },
    reducers: {
        addUserProfile: (state, action) => {
            state.profile = action.payload;
        }
    }
})

export const { addUserProfile } = userSlice.actions;

export default userSlice.reducer;