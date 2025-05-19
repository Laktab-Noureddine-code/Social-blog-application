import { createSlice } from '@reduxjs/toolkit';

const groupsSlice = createSlice({
    name: 'groups',
    initialState: {
        groups: [],
        userGroups: [],
        currentGroup: null,  // Added currentGroup
        loadingUserGroups: true,
        loadingGroups: true,
        loadingGroup: true
    },
    reducers: {
        setGroups: (state, action) => {
            state.groups = action.payload;
        },
        setCurrentGroup: (state, action) => {  // New reducer
            state.currentGroup = action.payload;
        },
        setLoadingUserGroups: (state, action) => {
            state.loadingUserGroups = action.payload;
        },
        setLoadingGroups: (state, action) => {
            state.loadingGroups = action.payload;
        },
        setLoadingGroup: (state, action) => {
            state.loadingGroup = action.payload;
        },
        addGroup: (state, action) => {
            state.groups.unshift(action.payload);
        },
        removeGroup: (state, action) => {
            state.groups = state.groups.filter(group => group.id !== action.payload);
        },
        setUserGroups: (state, action) => {
            state.userGroups = action.payload;
        },
        updateGroup: (state, action) => {
            const { groupId, updatedData } = action.payload;
            const group = state.groups.find(g => g.id === groupId);
            if (group) Object.assign(group, updatedData);

            const userGroup = state.userGroups.find(g => g.id === groupId);
            if (userGroup) Object.assign(userGroup, updatedData);

            if (state.currentGroup?.id === groupId) {  // Update currentGroup if needed
                state.currentGroup = { ...state.currentGroup, ...updatedData };
            }
        }
    }
});

export const {
    setGroups,
    setCurrentGroup,  // Export the new action
    setLoadingUserGroups,
    setLoadingGroups,
    setLoadingGroup,
    addGroup,
    removeGroup,
    setUserGroups,
    updateGroup
} = groupsSlice.actions;

export default groupsSlice.reducer;