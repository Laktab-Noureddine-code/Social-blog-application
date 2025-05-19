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
            console.log(state.currentGroup)
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
        },
        updateMemberRole: (state, action) => {
            const { userId, newRole } = action.payload;
            console.log("Updating role for user:", userId, "to:", newRole);
            if (!state.currentGroup || !state.currentGroup.members) {
                return;
            }
            
            // Find the member in the current group
            const memberIndex = state.currentGroup.members.findIndex(member => member.id === userId);
            
            if (memberIndex !== -1) {
                // Create a new members array with the updated member
                const updatedMembers = [...state.currentGroup.members];
                
                // Update the role in the pivot object
                updatedMembers[memberIndex] = {
                    ...updatedMembers[memberIndex],
                    pivot: {
                        ...updatedMembers[memberIndex].pivot,
                        role: newRole
                    }
                };
                
                // Update the currentGroup with the new members array
                state.currentGroup = {
                    ...state.currentGroup,
                    members: updatedMembers
                };
                
                // Also update the group in the groups array if it exists
                if (state.groups.length > 0) {
                    const groupIndex = state.groups.findIndex(g => g.id === state.currentGroup.id);
                    if (groupIndex !== -1) {
                        state.groups[groupIndex] = {
                            ...state.groups[groupIndex],
                            members: updatedMembers
                        };
                    }
                }
                
                // Also update in userGroups if it exists
                if (state.userGroups.length > 0) {
                    const userGroupIndex = state.userGroups.findIndex(g => g.id === state.currentGroup.id);
                    if (userGroupIndex !== -1) {
                        state.userGroups[userGroupIndex] = {
                            ...state.userGroups[userGroupIndex],
                            members: updatedMembers
                        };
                    }
                }
            }
        },
        deleteMember: (state, action) => {
            const userId = action.payload;
            console.log("Deleting member with user ID:", userId);
            
            if (!state.currentGroup || !state.currentGroup.members) {
                return;
            }
            
            // Filter out the member to be deleted
            const updatedMembers = state.currentGroup.members.filter(member => member.id !== userId);
            
            // Update the currentGroup with the new members array
            state.currentGroup = {
                ...state.currentGroup,
                members: updatedMembers
            };
            
            // Also update the group in the groups array if it exists
            if (state.groups.length > 0) {
                const groupIndex = state.groups.findIndex(g => g.id === state.currentGroup.id);
                if (groupIndex !== -1) {
                    state.groups[groupIndex] = {
                        ...state.groups[groupIndex],
                        members: updatedMembers
                    };
                }
            }
            
            // Also update in userGroups if it exists
            if (state.userGroups.length > 0) {
                const userGroupIndex = state.userGroups.findIndex(g => g.id === state.currentGroup.id);
                if (userGroupIndex !== -1) {
                    state.userGroups[userGroupIndex] = {
                        ...state.userGroups[userGroupIndex],
                        members: updatedMembers
                    };
                }
            }
        },
        addMember: (state, action) => {
            const newMember = action.payload;
            console.log("Adding new member:", newMember);
            
            if (!state.currentGroup || !state.currentGroup.members) {
                return;
            }
            
            // Check if member already exists
            const memberExists = state.currentGroup.members.some(member => member.id === newMember.id);
            if (memberExists) {
                return; // Member already exists, do nothing
            }
            
            // Add the new member to the members array
            const updatedMembers = [...state.currentGroup.members, newMember];
            
            // Update the currentGroup with the new members array
            state.currentGroup = {
                ...state.currentGroup,
                members: updatedMembers
            };
            
            // Also update the group in the groups array if it exists
            if (state.groups.length > 0) {
                const groupIndex = state.groups.findIndex(g => g.id === state.currentGroup.id);
                if (groupIndex !== -1) {
                    state.groups[groupIndex] = {
                        ...state.groups[groupIndex],
                        members: updatedMembers
                    };
                }
            }
            
            // Also update in userGroups if it exists
            if (state.userGroups.length > 0) {
                const userGroupIndex = state.userGroups.findIndex(g => g.id === state.currentGroup.id);
                if (userGroupIndex !== -1) {
                    state.userGroups[userGroupIndex] = {
                        ...state.userGroups[userGroupIndex],
                        members: updatedMembers
                    };
                }
            }
        },
        updateMemberStatus: (state, action) => {
            const { userId, newStatus } = action.payload;
            console.log("Updating status for user:", userId, "to:", newStatus);
            
            if (!state.currentGroup || !state.currentGroup.members) {
                return;
            }
            
            // Find the member in the current group
            const memberIndex = state.currentGroup.members.findIndex(member => member.id === userId);
            
            if (memberIndex !== -1) {
                // Create a new members array with the updated member
                const updatedMembers = [...state.currentGroup.members];
                
                // Update the status in the pivot object
                updatedMembers[memberIndex] = {
                    ...updatedMembers[memberIndex],
                    pivot: {
                        ...updatedMembers[memberIndex].pivot,
                        status: newStatus
                    }
                };
                
                // Update the currentGroup with the new members array
                state.currentGroup = {
                    ...state.currentGroup,
                    members: updatedMembers
                };
                
                // Also update the group in the groups array if it exists
                if (state.groups.length > 0) {
                    const groupIndex = state.groups.findIndex(g => g.id === state.currentGroup.id);
                    if (groupIndex !== -1) {
                        state.groups[groupIndex] = {
                            ...state.groups[groupIndex],
                            members: updatedMembers
                        };
                    }
                }
                
                // Also update in userGroups if it exists
                if (state.userGroups.length > 0) {
                    const userGroupIndex = state.userGroups.findIndex(g => g.id === state.currentGroup.id);
                    if (userGroupIndex !== -1) {
                        state.userGroups[userGroupIndex] = {
                            ...state.userGroups[userGroupIndex],
                            members: updatedMembers
                        };
                    }
                }
            }
        }
    }
    
});

// Don't forget to export the new action
export const {
    setGroups,
    setCurrentGroup,
    setLoadingUserGroups,
    setLoadingGroups,
    setLoadingGroup,
    addGroup,
    removeGroup,
    setUserGroups,
    updateGroup,
    updateMemberRole,
    deleteMember,
    addMember,
    updateMemberStatus  // Export the new action
} = groupsSlice.actions;

export default groupsSlice.reducer;