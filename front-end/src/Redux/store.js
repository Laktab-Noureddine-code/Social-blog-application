import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import usersReducer from './usersSlice';
import messagesReducer from './messagesSlice';
import groupsReducer from './groupsSlice';
import notificationsReducer from './notificationsSlice';
import ProfileReduser from './ProfileSlice';
import AmisReduser from "./AmisSicie";
// import CommentsReduser from './CommentsSlice'
// import LikesReduser from './LikesSlice';
import InvitationReduser from './InvitationSlice';
import PostsReduser from './PostsSilce';

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    messages: messagesReducer,
    groups: groupsReducer,
    notifications: notificationsReducer,
    profile: ProfileReduser,
    amis: AmisReduser,
    // comments: CommentsReduser,
    // likes: LikesReduser,
    invitation: InvitationReduser,
    posts: PostsReduser,
  },
});

export default store;
