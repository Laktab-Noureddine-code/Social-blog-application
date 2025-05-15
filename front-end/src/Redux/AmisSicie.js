// Redux Toolkit version of your reducer using createSlice

import { createSlice } from "@reduxjs/toolkit";

const AmisSlice = createSlice({
  name: "amis",
  initialState:{
    friends: [],
  },
  reducers: {
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
  addNewFriend,
  removeFriend,
} = AmisSlice.actions;

export default AmisSlice.reducer;
