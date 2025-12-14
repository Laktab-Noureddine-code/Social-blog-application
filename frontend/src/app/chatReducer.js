import { createSlice } from "@reduxjs/toolkit";
import { chats } from "../data/chat";

const chatSlice = createSlice({
    name: "chat",
    initialState: {
        chats: chats,
    },
    reducers: {

    }
})
// export const 
export default chatSlice.reducer;