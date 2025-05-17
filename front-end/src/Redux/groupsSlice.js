import { createSlice } from '@reduxjs/toolkit';

const groupsSlice = createSlice({
    name: 'groups',
    initialState: {
        groups: [],
        userGroups: [],
        loadingUserGroups: true
    },
    reducers: {
        setGroups: (state, action) => {
            state.groups = action.payload;
        },
        setLoadingUserGroups: (state, action) => {
            state.loadingUserGroups = action.payload;
        },
        addGroup: (state, action) => {
            state.groups.unshift(action.payload);
        },
        removeGroup: (state, action) => {
            state.groups = state.groups.filter(group => group.id !== action.payload);
        },
        setUserGroups: (state, action) => {
            state.userGroups = action.payload
        },
        updateGroup: (state, action) => {
            const { groupId, updatedData } = action.payload;

            // Update in groups array
            const group = state.groups.find(g => g.id === groupId);
            if (group) {
                Object.assign(group, updatedData);
            }

            // Also update in userGroups array if needed
            const userGroup = state.userGroups.find(g => g.id === groupId);
            if (userGroup) {
                Object.assign(userGroup, updatedData);
            }
        }

    }
});

export const {
    setGroups,
    addGroup,
    setUserGroups,
    removeGroup,
    updateGroup,
    setLoadingUserGroups
} = groupsSlice.actions;

export default groupsSlice.reducer;