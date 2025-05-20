import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import usersReducer from './usersSlice';
import messagesReducer from './messagesSlice';
import groupsReducer from './groupsSlice';
import ProfileReduser from './ProfileSlice';
import AmisReduser from "./AmisSicie";
import InvitationReduser from './InvitationSlice';
import PostsReduser from './PostsSilce';
import PageReduser from './PageSlice.js'
import PagesReduser from './PagesSlice.js'

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    messages: messagesReducer,
    groups: groupsReducer,
    profile: ProfileReduser,
    amis: AmisReduser,
    page: PageReduser,
    invitation: InvitationReduser,
    posts: PostsReduser,
    pages: PagesReduser,
  },
});

export default store;
