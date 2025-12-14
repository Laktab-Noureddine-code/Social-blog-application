import { createSlice } from "@reduxjs/toolkit";

const ProfileSlice = createSlice({
  name: "profile",
  initialState: {
    medias: [],
    user: {},
    amis: [],
  showProfilePrompt: false
  },
  reducers: {
    setShowProfilePrompt: (state, action) => {
      state.showProfilePrompt = action.payload;
    },
    stopLoading: (state) => {
      state.isLoading = false;
    },
    getMediasProfile: (state, action) => {
      state.medias = action.payload;
    },
    getUserProfile: (state, action) => {
      state.user = action.payload;
    },
    getUserFriends: (state, action) => {
      state.amis = action.payload;
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



// const initialState = {
//   medias: [],
//   user: {},
//   amis: [],
// };

// const profileSlice = createSlice({
//   name: "profile",
//   initialState,
//   reducers: {
//     getMediasProfile: (state, action) => {
//       state.medias = action.payload; // safe because immer handles immutability
//     },
//     getUserProfile: (state, action) => {
//       state.user = action.payload;
//     },
//     getUserFriends: (state, action) => {
//       state.amis = action.payload;
//     },
//     // ... other reducers
//   },
// });

// export const { getMediasProfile, getUserProfile, getUserFriends } =
//   profileSlice.actions;
// export default profileSlice.reducer;
