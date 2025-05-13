import { createSlice } from '@reduxjs/toolkit';


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: null,
        user: null
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
            console.log(state.token)
        },
        setUser: (state, action) => {
            state.user = action.payload;
            console.log(state.user)
        },
        logout: (state) => {
            state.token = null;
            state.user = null;
        },
    },
});

// Export actions and reducer
export const { setToken, setUser, logout } = authSlice.actions;
export default authSlice.reducer;