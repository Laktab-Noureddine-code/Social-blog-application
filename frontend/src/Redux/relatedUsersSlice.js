import { createSlice } from '@reduxjs/toolkit';

const relatedUsersSlice = createSlice({
    name: 'relatedUsers',
    initialState: {
        list: [],
        friendsLoading : true,
    },
    reducers: {
        setRelatedUsers: (state, action) => {
            state.list = action.payload;
        },
        setFriendsLoading: (state, action) => {
            state.friendsLoading = action.payload;
        },
        addRelatedUser: (state, action) => {
            const exists = state.list.find(user => user.id === action.payload.id);
            if (!exists) {
                state.list.push(action.payload);
            }
        },
        removeRelatedUser: (state, action) => {
            state.list = state.list.filter(user => user.id !== action.payload);
        },
        clearRelatedUsers: (state) => {
            state.list = [];
        },
        updateRelatedUser: (state, action) => {
            const index = state.list.findIndex(user => user.id === action.payload.id);
            if (index !== -1) {
                state.list[index] = {
                    ...state.list[index],
                    ...action.payload,
                };
            }
        },
    },
});

export const {
    setRelatedUsers,
    setFriendsLoading,
    addRelatedUser,
    removeRelatedUser,
    clearRelatedUsers,
    updateRelatedUser,
} = relatedUsersSlice.actions;

export default relatedUsersSlice.reducer;
