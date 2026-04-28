import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        adminProfile: null
    },
    reducers: {
        addAdminProfile: (state, action) => {
            state.adminProfile = action.payload;
        }
    }
})

export const { addAdminProfile } = adminSlice.actions;

export default adminSlice.reducer;