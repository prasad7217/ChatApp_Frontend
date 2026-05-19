import { createSlice } from "@reduxjs/toolkit";

const allUserSlice = createSlice({
    name: "allUsers",
    initialState: [],
    reducers: {
        addAllUsers: (state, action) => {
            return action.payload;
        }
    }
})

export const { addAllUsers } = allUserSlice.actions;

export default allUserSlice.reducer;