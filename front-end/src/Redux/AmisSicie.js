// Redux Toolkit version of your reducer using createSlice

import { createSlice } from "@reduxjs/toolkit";

const AmisSlice = createSlice({
  name: "amis",
  initialState: {
    friends: [],
    loading: true
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    updateUserFriends: (state, action) => {
      state.friends = action.payload;
    },
    addNewFriend: (state, action) => {
      state.friends.unshift(action.payload);
    },
    removeFriend: (state, action) => {
      state.friends = state.friends.filter(
        (friend) => friend.id !== action.payload.id
      );
    },
  },
});

export const {
  updateUserFriends,
  setLoading,
  addNewFriend,
  removeFriend,
} = AmisSlice.actions;

export default AmisSlice.reducer;
