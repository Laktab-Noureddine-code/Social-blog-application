import { createSlice } from '@reduxjs/toolkit';

const messagesSlice = createSlice({
    name: 'messages',
    initialState: {
        messages: [],
        groupMessages: [],
        groupMessagesLoading: false,
        messagesLoading: false,
        sendingMessage: false, // for sending messages
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
    setGroupMessagesLoading,
    setMessagesLoading,
    setSendingMessage
} = messagesSlice.actions;
export default messagesSlice.reducer;
