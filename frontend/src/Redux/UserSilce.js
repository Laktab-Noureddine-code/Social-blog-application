import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "user",
  initialState: {
    savedPost: [],
  },
  reducers: {
    getSavedPosts: (state, action) => {
      state.savedPost = action.payload;
    },
    addNewSavedPost: (state, action) => {
      state.savedPost.unshift(action.payload);
    },
    removeSavedPpost: (state, action) => {
      state.savedPost = state.savedPost.filter(
        (page) => page.id !== action.payload.id
      );
    },
  },
});

export const { addNewSavedPost, getSavedPosts, removeSavedPpost } = UserSlice.actions;
export default UserSlice.reducer;
