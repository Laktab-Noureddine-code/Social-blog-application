import { createSlice } from "@reduxjs/toolkit";

const PagesSlice = createSlice({
  name: "pages",
  initialState: {
    admin_pages: [],
    following_pages: [],
    my_pages: [],
    others_pages: [],
  },
  reducers: {
    // Admin Pages
    getAdminPages: (state, action) => {
      state.admin_pages = action.payload;
    },
    getNewAdminPage: (state, action) => {
      state.admin_pages.unshift(action.payload);
    },
    removeNewAdminPage: (state, action) => {
      state.admin_pages = state.admin_pages.filter(
        (page) => page.id !== action.payload.id
      );
    },

    // Following Pages
    getFollowingPages: (state, action) => {
      state.following_pages = action.payload;
    },
    getNewFollowingPage: (state, action) => {
      state.following_pages.unshift(action.payload);
    },
    removeFollowingPage: (state, action) => {
      state.following_pages = state.following_pages.filter(
        (page) => page.id !== action.payload.id
      );
    },

    // My Pages
    getMyPages: (state, action) => {
      state.my_pages = action.payload;
    },
    getNewMyPage: (state, action) => {
      state.my_pages.unshift(action.payload);
    },
    removeMyPage: (state, action) => {
      state.my_pages = state.my_pages.filter(
        (page) => page.id !== action.payload
      );
    },

    // Others Pages
    getOthersPages: (state, action) => {
      state.others_pages = action.payload;
    },
    getNewOthersPage: (state, action) => {
      state.others_pages.unshift(action.payload);
    },
    removeOthersPage: (state, action) => {
      state.others_pages = state.others_pages.filter(
        (page) => page.id !== action.payload.id
      );
    },
  },
});

export const {
  getAdminPages,
  getNewAdminPage,
  removeNewAdminPage,

  getFollowingPages,
  getNewFollowingPage,
  removeFollowingPage,

  getMyPages,
  getNewMyPage,
  removeMyPage,

  getOthersPages,
  getNewOthersPage,
  removeOthersPage,
} = PagesSlice.actions;

export default PagesSlice.reducer;

