import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import usersReducer from './usersSlice';
import messagesReducer from './messagesSlice';
import groupsReducer from './groupsSlice';
import notificationsReducer from './notificationsSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        users: usersReducer,
        messages: messagesReducer,
        groups : groupsReducer,
        notifications: notificationsReducer,
    },
});

export default store;
