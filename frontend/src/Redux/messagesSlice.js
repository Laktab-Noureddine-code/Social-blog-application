import { createSlice } from '@reduxjs/toolkit';

const messagesSlice = createSlice({
    name: 'messages',
    initialState: {
        messages: [],
        groupMessages: [],
        groupMessagesLoading: false,
        messagesLoading: false,
        sendingMessage: false,
        editingMessage: null, // message being edited
    },
    reducers: {
        setMessages: (state, action) => {
            state.messages = action.payload;
        },
        deleteMessage: (state, action) => {
            state.messages = state.messages.filter(msg => msg.id !== action.payload);
        },
        addMessage: (state, action) => {
            state.messages.push(action.payload);
        },
        updateMessage: (state, action) => {
            const { id, message } = action.payload;
            const index = state.messages.findIndex(msg => msg.id === id);
            if (index !== -1) {
                state.messages[index].message = message;
                state.messages[index].updated_at = new Date().toISOString();
            }
        },
        setEditingMessage: (state, action) => {
            state.editingMessage = action.payload;
        },
        clearEditingMessage: (state) => {
            state.editingMessage = null;
        },
        setGroupMessages: (state, action) => {
            state.groupMessages = action.payload
        },
        AddGroupMessages: (state, action) => {
            // Ensure the payload has a proper structure
            const newMessage = {
                ...action.payload,
                sender_id: action.payload.sender?.id || action.payload.sender_id,
                sender: action.payload.sender || null
            };
            state.groupMessages.push(newMessage);
        },
        updateGroupMessage: (state, action) => {
            const { id, message } = action.payload;
            const index = state.groupMessages.findIndex(msg => msg.id === id);
            if (index !== -1) {
                state.groupMessages[index].message = message;
                state.groupMessages[index].updated_at = new Date().toISOString();
            }
        },
        deleteGroupMessage: (state, action) => {
            state.groupMessages = state.groupMessages.filter(msg => msg.id !== action.payload);
        },
        setGroupMessagesLoading: (state, action) => {
            state.groupMessagesLoading = action.payload;
        },
        setMessagesLoading: (state, action) => {
            state.messagesLoading = action.payload;
        },
        setSendingMessage: (state, action) => {
            state.sendingMessage = action.payload;
        },
    }
});

export const {
    setMessages,
    setGroupMessages,
    AddGroupMessages,
    deleteMessage,
    addMessage,
    updateMessage,
    setEditingMessage,
    clearEditingMessage,
    updateGroupMessage,
    deleteGroupMessage,
    setGroupMessagesLoading,
    setMessagesLoading,
    setSendingMessage
} = messagesSlice.actions;
export default messagesSlice.reducer;
