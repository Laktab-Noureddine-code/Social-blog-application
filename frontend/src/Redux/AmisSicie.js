// Redux Toolkit version of your reducer using createSlice

import { createSlice } from "@reduxjs/toolkit";

const AmisSlice = createSlice({
  name: "amis",
  initialState: {
    friends: [],
    authers: [],
    abonnes: [],
    loading: true
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    updateUserFriends: (state, action) => {
      state.friends = action.payload;
    },
    updateUserAbonnes: (state, action) => {
      state.abonnes = action.payload;
    },
    updateUserauthers: (state, action) => {
      state.authers = action.payload;
    },
    addNewFriend: (state, action) => {
      state.friends.unshift(action.payload);
    },
    addNewAbonnes: (state, action) => {
      state.abonnes.unshift(action.payload);
    },
    removeFriend: (state, action) => {
      state.friends = state.friends.filter(
        (friend) => friend.id !== action.payload.id
      );
    },
    removeAbonne: (state, action) => {
      state.abonnes = state.abonnes.filter(
        (abonne) => abonne.id !== action.payload.id
      );
    },
    addMoreAuthers: (state, action) => {
      state.authers = [...state.authers, ...action.payload];
    },
    removeAuhter: (state, action) => {
      state.authers = state.authers.filter(
        (auther) => auther.user.id !== action.payload
      );
    },
  },
});

export const {
  updateUserFriends,
  setLoading,
  addNewFriend,
  removeFriend,
  updateUserauthers,
  removeAuhter,
  addMoreAuthers,
  updateUserAbonnes,
  removeAbonne,
  addNewAbonnes,
} = AmisSlice.actions;

export default AmisSlice.reducer;
