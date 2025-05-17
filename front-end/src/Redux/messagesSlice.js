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
            state.groupMessages.push(action.payload);
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
