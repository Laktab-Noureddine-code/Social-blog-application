import { createSlice } from '@reduxjs/toolkit';

const messagesSlice = createSlice({
    name: 'messages',
    initialState: {
        messages: [],
        groupMessages: []
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
        }
    }
});

export const { setMessages, setGroupMessages,
    AddGroupMessages, deleteMessage, addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
