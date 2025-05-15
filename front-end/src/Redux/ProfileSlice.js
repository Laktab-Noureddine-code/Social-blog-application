import { createSlice } from "@reduxjs/toolkit";

const ProfileSlice = createSlice({
  name: "profile",
  initialState:{
  medias: [],
  user: {},
  amis: [],
  },
  reducers: {
    setShowProfilePrompt: (state, action) => {
      state.showProfilePrompt = action.payload;
    },
    stopLoading: (state) => {
      state.isLoading = false;
    },
    getMediasProfile: (state, action) => {
      state.Profile.medias = action.payload;
    },
    getUserProfile: (state, action) => {
      state.Profile.user = action.payload;
    },
    getUserFriends: (state, action) => {
      state.Profile.amis = action.payload;
    },
  },
});

export const {
  setShowProfilePrompt,
  getMediasProfile,
  getUserProfile,
  getUserFriends,
} = ProfileSlice.actions;

export default ProfileSlice.reducer;
