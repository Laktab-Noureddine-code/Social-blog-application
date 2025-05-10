import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import usersReducer from './usersSlice';
import messagesReducer from './messagesSlice';
import groupsReducer from './groupsSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        users: usersReducer,
        messages: messagesReducer,
        groups : groupsReducer,
    },
});

export default store;
