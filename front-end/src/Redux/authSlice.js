import { createSlice } from '@reduxjs/toolkit';


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        access_token: null,
        user: null
    },
    reducers: {
        setToken: (state, action) => {
            state.access_token = action.payload;
            console.log(state.access_token)
        },
        setUser: (state, action) => {
            state.user = action.payload;
            console.log(state.user)
        },
        logout: (state) => {
            state.access_token = null;
            state.user = null;
        },
    },
});

// Export actions and reducer
export const { setToken, setUser, logout } = authSlice.actions;
export default authSlice.reducer;