import { createSlice } from '@reduxjs/toolkit';

const groupsSlice = createSlice({
  name: "groups",
  initialState: {
    groups: [],
    userGroups: [],
    currentGroup: null, // Added currentGroup
    loadingUserGroups: true,
    loadingGroups: true,
    loadingGroup: true,
    selectedInvites: [], // New state to track selected users for invitation
    postsGroup: [],
  },
  reducers: {
    setGroups: (state, action) => {
      state.groups = action.payload;
    },
    setCurrentGroup: (state, action) => {
      // New reducer
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
    setPostGroup: (state, action) => {
      state.loadingGroup = action.payload;
    },
    addNewPostGroup: (state, action) => {
      state.postsGroup.unshift(action.payload);
    },
    removePostGroup: (state, action) => {
      state.postsGroup = state.postsGroup.filter(
        (page) => page.id !== action.payload.id
      );
    },
    addGroup: (state, action) => {
      state.groups.unshift(action.payload);
    },
    removeGroup: (state, action) => {
      state.groups = state.groups.filter(
        (group) => group.id !== action.payload
      );
    },
    setUserGroups: (state, action) => {
      state.userGroups = action.payload;
    },
    updateGroup: (state, action) => {
      const { groupId, updatedData } = action.payload;
      const group = state.groups.find((g) => g.id === groupId);
      if (group) Object.assign(group, updatedData);

      const userGroup = state.userGroups.find((g) => g.id === groupId);
      if (userGroup) Object.assign(userGroup, updatedData);

      if (state.currentGroup?.id === groupId) {
        // Update currentGroup if needed
        state.currentGroup = { ...state.currentGroup, ...updatedData };
      }
    },
    updateMemberRole: (state, action) => {
      const { userId, newRole } = action.payload;
      if (!state.currentGroup || !state.currentGroup.members) {
        return;
      }

      // Find the member in the current group
      const memberIndex = state.currentGroup.members.findIndex(
        (member) => member.id === userId
      );

      if (memberIndex !== -1) {
        // Create a new members array with the updated member
        const updatedMembers = [...state.currentGroup.members];

        // Update the role in the pivot object
        updatedMembers[memberIndex] = {
          ...updatedMembers[memberIndex],
          pivot: {
            ...updatedMembers[memberIndex].pivot,
            role: newRole,
          },
        };

        // Update the currentGroup with the new members array
        state.currentGroup = {
          ...state.currentGroup,
          members: updatedMembers,
        };

        // Also update the group in the groups array if it exists
        if (state.groups.length > 0) {
          const groupIndex = state.groups.findIndex(
            (g) => g.id === state.currentGroup.id
          );
          if (groupIndex !== -1) {
            state.groups[groupIndex] = {
              ...state.groups[groupIndex],
              members: updatedMembers,
            };
          }
        }

        // Also update in userGroups if it exists
        if (state.userGroups.length > 0) {
          const userGroupIndex = state.userGroups.findIndex(
            (g) => g.id === state.currentGroup.id
          );
          if (userGroupIndex !== -1) {
            state.userGroups[userGroupIndex] = {
              ...state.userGroups[userGroupIndex],
              members: updatedMembers,
            };
          }
        }
      }
    },
    deleteMember: (state, action) => {
      const userId = action.payload;

      if (!state.currentGroup || !state.currentGroup.members) {
        return;
      }

      // Filter out the member to be deleted
      const updatedMembers = state.currentGroup.members.filter(
        (member) => member.id !== userId
      );

      // Update the currentGroup with the new members array
      state.currentGroup = {
        ...state.currentGroup,
        members: updatedMembers,
      };

      // Also update the group in the groups array if it exists
      if (state.groups.length > 0) {
        const groupIndex = state.groups.findIndex(
          (g) => g.id === state.currentGroup.id
        );
        if (groupIndex !== -1) {
          state.groups[groupIndex] = {
            ...state.groups[groupIndex],
            members: updatedMembers,
          };
        }
      }

      // Also update in userGroups if it exists
      if (state.userGroups.length > 0) {
        const userGroupIndex = state.userGroups.findIndex(
          (g) => g.id === state.currentGroup.id
        );
        if (userGroupIndex !== -1) {
          state.userGroups[userGroupIndex] = {
            ...state.userGroups[userGroupIndex],
            members: updatedMembers,
          };
        }
      }
    },
    addMember: (state, action) => {
      const newMember = action.payload;

      if (!state.currentGroup || !state.currentGroup.members) {
        return;
      }

      // Check if member already exists
      const memberExists = state.currentGroup.members.some(
        (member) => member.id === newMember.id
      );
      if (memberExists) {
        return; // Member already exists, do nothing
      }

      // Add the new member to the members array
      const updatedMembers = [...state.currentGroup.members, newMember];

      // Update the currentGroup with the new members array
      state.currentGroup = {
        ...state.currentGroup,
        members: updatedMembers,
      };

      // Also update the group in the groups array if it exists
      if (state.groups.length > 0) {
        const groupIndex = state.groups.findIndex(
          (g) => g.id === state.currentGroup.id
        );
        if (groupIndex !== -1) {
          state.groups[groupIndex] = {
            ...state.groups[groupIndex],
            members: updatedMembers,
          };
        }
      }

      // Also update in userGroups if it exists
      if (state.userGroups.length > 0) {
        const userGroupIndex = state.userGroups.findIndex(
          (g) => g.id === state.currentGroup.id
        );
        if (userGroupIndex !== -1) {
          state.userGroups[userGroupIndex] = {
            ...state.userGroups[userGroupIndex],
            members: updatedMembers,
          };
        }
      }
    },
    updateMemberStatus: (state, action) => {
      const { userId, newStatus } = action.payload;

      if (!state.currentGroup || !state.currentGroup.members) {
        return;
      }

      // Find the member in the current group
      const memberIndex = state.currentGroup.members.findIndex(
        (member) => member.id === userId
      );

      if (memberIndex !== -1) {
        // Create a new members array with the updated member
        const updatedMembers = [...state.currentGroup.members];

        // Update the status in the pivot object
        updatedMembers[memberIndex] = {
          ...updatedMembers[memberIndex],
          pivot: {
            ...updatedMembers[memberIndex].pivot,
            status: newStatus,
          },
        };

        // Update the currentGroup with the new members array
        state.currentGroup = {
          ...state.currentGroup,
          members: updatedMembers,
        };

        // Also update the group in the groups array if it exists
        if (state.groups.length > 0) {
          const groupIndex = state.groups.findIndex(
            (g) => g.id === state.currentGroup.id
          );
          if (groupIndex !== -1) {
            state.groups[groupIndex] = {
              ...state.groups[groupIndex],
              members: updatedMembers,
            };
          }
        }

        // Also update in userGroups if it exists
        if (state.userGroups.length > 0) {
          const userGroupIndex = state.userGroups.findIndex(
            (g) => g.id === state.currentGroup.id
          );
          if (userGroupIndex !== -1) {
            state.userGroups[userGroupIndex] = {
              ...state.userGroups[userGroupIndex],
              members: updatedMembers,
            };
          }
        }
      }
    },

    setSelectedInvites: (state, action) => {
      state.selectedInvites = action.payload;
    },

    addSelectedInvite: (state, action) => {
      const userId = action.payload;
      if (!state.selectedInvites.includes(userId)) {
        state.selectedInvites.push(userId);
      }
    },

    removeSelectedInvite: (state, action) => {
      const userId = action.payload;
      state.selectedInvites = state.selectedInvites.filter(
        (id) => id !== userId
      );
    },

    clearSelectedInvites: (state) => {
      state.selectedInvites = [];
    },

    inviteMembers: (state, action) => {
      const userIds = action.payload;

      if (!state.currentGroup || !state.currentGroup.members) {
        return;
      }

      // Create new members with 'invited' role
      const newMembers = userIds.map((userId) => ({
        id: userId,
        pivot: {
          role: "member",
          status: "invited",
        },
      }));

      // Filter out any users that are already members
      const filteredNewMembers = newMembers.filter(
        (newMember) =>
          !state.currentGroup.members.some(
            (member) => member.id === newMember.id
          )
      );

      if (filteredNewMembers.length === 0) {
        return; // No new members to add
      }

      // Add the new members to the current group
      const updatedMembers = [
        ...state.currentGroup.members,
        ...filteredNewMembers,
      ];

      // Update the currentGroup with the new members array
      state.currentGroup = {
        ...state.currentGroup,
        members: updatedMembers,
      };

      // Also update the group in the groups array if it exists
      if (state.groups.length > 0) {
        const groupIndex = state.groups.findIndex(
          (g) => g.id === state.currentGroup.id
        );
        if (groupIndex !== -1) {
          state.groups[groupIndex] = {
            ...state.groups[groupIndex],
            members: updatedMembers,
          };
        }
      }

      // Also update in userGroups if it exists
      if (state.userGroups.length > 0) {
        const userGroupIndex = state.userGroups.findIndex(
          (g) => g.id === state.currentGroup.id
        );
        if (userGroupIndex !== -1) {
          state.userGroups[userGroupIndex] = {
            ...state.userGroups[userGroupIndex],
            members: updatedMembers,
          };
        }
      }

      // Clear the selected invites after adding them
      state.selectedInvites = [];
    },
  },
});

// Don't forget to export the new actions
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
  updateMemberStatus,
  // New actions for invitation functionality
  setSelectedInvites,
  addSelectedInvite,
  removeSelectedInvite,
  clearSelectedInvites,
  inviteMembers,
  setPostGroup,
  addNewPostGroup,
  removePostGroup,
} = groupsSlice.actions;

export default groupsSlice.reducer;