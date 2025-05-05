import { configureStore } from "@reduxjs/toolkit";
import chatSlice from "./chatReducer";
import usersSlice from "./usersReducer";

export const AppStore = configureStore({
    reducer: {
        chat: chatSlice,
        user: usersSlice
    }
})