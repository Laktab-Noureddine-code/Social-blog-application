import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: "auth",
  initialState: {
    access_token: '',
    user: {},
    isLoading: true,
    path: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.access_token = action.payload;
    },
    setPath: (state, action) => {
      state.path = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.access_token = null;
      state.user = null;
    },
  },
});

// Export actions and reducer
export const { setIsLoading, setToken, setUser, logout, setPath } = authSlice.actions;
export default authSlice.reducer;
