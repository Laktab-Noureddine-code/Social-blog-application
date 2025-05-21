import { createSlice } from "@reduxjs/toolkit";

const PageSlice = createSlice({
  name: "page",
  initialState: {
    medias: [],
    admins: [],
    followersCount: null,
    followers: [],
    page: {},
    loding: true,
  },
  reducers: {
    getMediasPage: (state, action) => {
      state.medias = action.payload;
    },
    getAdminsPage: (state, action) => {
      state.admins = action.payload;
    },
    getFollowersCountrPage: (state, action) => {
      state.followersCount = action.payload;
    },
    getFollowersPage: (state, action) => {
      state.followers = action.payload;
    },
    getPage: (state, action) => {
      state.page = action.payload;
    },
    getFlloersPage: (state, action) => {
      state.followers = action.payload;
    },
    setLoadingPage: (state, action) => {
      state.loding = action.payload;
    },
    removeFolloersPage: (state, action) => {
      state.followers = state.followers.filter(
        (page) => page.id !== action.payload.id
      );
    },
    removeAdminPage: (state, action) => {
      state.admins = state.admins.filter(
        (page) => page.id !== action.payload.id
      );
    },
  },
});

export const {
  getMediasPage,
  getAdminsPage,
  getFollowersCountrPage,
  getFollowersPage,
  getPage,
  getFlloersPage,
  removeFolloersPage,
  setLoadingPage,
  removeAdminPage,
} = PageSlice.actions;

export default PageSlice.reducer;

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
