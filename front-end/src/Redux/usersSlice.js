import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
    name : "users",
    initialState: {
        users : [],
    },
    reducers : {
        setUsers: (state, action) => {
            state.users = action.payload;
        },
    }
})

export const {setUsers} = usersSlice.actions;
export default usersSlice.reducer;