import { createSlice } from '@reduxjs/toolkit';

const messagesSlice = createSlice({
    name: 'messages',
    initialState: {
        messages: [],
    },
    reducers: {
        setMessages: (state, action) => {
            state.messages = action.payload;
            console.log(state.messages)
        },
        deleteMessage: (state, action) => {
            state.messages = state.messages.filter(msg => msg.id !== action.payload);
        },
        addMessage: (state, action) => {
            state.messages.push(action.payload);
        }
    }
});

export const { setMessages, deleteMessage, addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
