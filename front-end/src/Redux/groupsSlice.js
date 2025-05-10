import { createSlice } from '@reduxjs/toolkit';

const groupsSlice = createSlice({
    name: 'groups',
    initialState: {
        groups: [],
        userGroups: []
    },
    reducers: {
        setGroups: (state, action) => {
            state.groups = action.payload;
        },
        addGroup: (state, action) => {
            state.groups.unshift(action.payload);
        },
        removeGroup: (state, action) => {
            state.groups = state.groups.filter(group => group.id !== action.payload);
        },
        setUserGroups: (state, action) => {
            state.userGroups = action.payload
        }
    }
});

export const {
    setGroups,
    addGroup,
    setUserGroups,
    removeGroup,
} = groupsSlice.actions;

export default groupsSlice.reducer;