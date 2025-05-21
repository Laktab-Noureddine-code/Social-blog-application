// Redux Toolkit version of your reducer using createSlice

import { createSlice } from "@reduxjs/toolkit";

const InviationSlice = createSlice({
  name: "invitation",
  initialState : {
    invitationsEnvoyees: [],
    invitationsRecues: [],
    loading: true,
  },
  reducers: {
    getInvitationsEnvoyees: (state, action) => {
      state.invitationsEnvoyees = action.payload;
    },
    SetIsLoadingInvitaion: (state, action) => {
      state.loading = action.payload;
    },
    addNewInvitationEnvoyee: (state, action) => {
      state.invitationsEnvoyees.unshift(action.payload);
    },
    removeInvitationEnvoyee: (state, action) => {
      state.invitationsEnvoyees = state.invitationsEnvoyees.filter(
        (inv) => inv.id !== action.payload.id
      );
    },
    getInvitationsRecues: (state, action) => {
      state.invitationsRecues = action.payload;
    },
    addNewInvitationRecue: (state, action) => {
      state.invitationsRecues.unshift(action.payload);
    },
    removeInvitationRecue: (state, action) => {
      state.invitationsRecues = state.invitationsRecues.filter(
        (inv) => inv.id !== action.payload.id
      );
    },
  },
});

export const {
  getInvitationsEnvoyees,
  addNewInvitationEnvoyee,
  removeInvitationEnvoyee,
  getInvitationsRecues,
  addNewInvitationRecue,
  removeInvitationRecue,
  SetIsLoadingInvitaion,
} = InviationSlice.actions;

export default InviationSlice.reducer;
