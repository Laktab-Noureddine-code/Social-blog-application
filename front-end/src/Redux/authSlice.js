import { createSlice } from '@reduxjs/toolkit';


const authSlice = createSlice({
  name: "auth",
  initialState: {
    access_token: null,
    user: null,
    isLoading: true,
  },
  reducers: {
    setToken: (state, action) => {
      state.access_token = action.payload;
      console.log("from set token : " ,state.access_token)
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      console.log("this user hh setUser");
    },
    logout: (state) => {
      state.access_token = null;
      state.user = null;
    },
  },
});

// Export actions and reducer
export const {setIsLoading, setToken, setUser, logout } = authSlice.actions;
export default authSlice.reducer;