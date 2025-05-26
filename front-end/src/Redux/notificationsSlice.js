import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    notifications: [],
    unreadCount: 0
};

const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        setNotifications: (state, action) => {
            state.notifications = action.payload;
            state.unreadCount = action.payload.filter(notif => notif.is_read === 0).length;
            console.log(state.notifications)
        },
        markAsRead: (state, action) => {
            const notification = state.notifications.find(n => n.id === action.payload);
            if (notification && notification.is_read === 0) {
                notification.is_read = 1;
                state.unreadCount -= 1;
            }
        },
        markAllAsRead: (state) => {
            state.notifications.forEach(notification => {
                notification.is_read = 1;
            });
            state.unreadCount = 0;
        },
        addNotification: (state, action) => {
            state.notifications.unshift(action.payload);
            if (action.payload.is_read === 0) {
                state.unreadCount += 1;
            }
        }
    }
});

export const {
    setNotifications,
    markAsRead,
    markAllAsRead,
    addNotification
} = notificationSlice.actions;

export const selectNotifications = (state) => state.notifications.notifications;
export const selectUnreadCount = (state) => state.notifications.unreadCount;

export default notificationSlice.reducer;