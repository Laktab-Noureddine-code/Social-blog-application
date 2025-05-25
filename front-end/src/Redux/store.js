import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import usersReducer from './usersSlice';
import messagesReducer from './messagesSlice';
import groupsReducer from './groupsSlice';
import notificationsReducer from './notificationsSlice';
import ProfileReduser from './ProfileSlice';
import AmisReduser from "./AmisSicie";
import InvitationReduser from './InvitationSlice';
import PostsReduser from './PostsSilce';
import PageReduser from './PageSlice.js'
import PagesReduser from './PagesSlice.js'
import relatedUsersReducer from './relatedUsersSlice';
import userReducer from './UserSilce';
import blogInteractionsReducer from './blogInteractionsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    user: userReducer,
    messages: messagesReducer,
    groups: groupsReducer,
    notifications: notificationsReducer,
    profile: ProfileReduser,
    amis: AmisReduser,
    page: PageReduser,
    invitation: InvitationReduser,
    posts: PostsReduser,
    pages: PagesReduser,
    relatedUsers: relatedUsersReducer,
    blogInteractions : blogInteractionsReducer, 
  },
});

export default store;
