import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessages, setMessagesLoading } from "@/Redux/messagesSlice";
import api from "@/lib/api";

export default function useMessagesLoader(chatId, isGroup) {
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector(state => state.auth);
    const { messages } = useSelector(state => state.messages);

    useEffect(() => {
        if (!isAuthenticated || isGroup) return;
        const fetchMessages = async () => {
            dispatch(setMessagesLoading(true));
            try {
                // Cookie is sent automatically with api client
                const response = await api.get(`/api/messages/${chatId}`);
                dispatch(setMessages(response.data));
                dispatch(setMessagesLoading(false));
            } catch (err) {
                console.error('Error fetching messages:', err);
            } 
        };

        fetchMessages();
    }, [dispatch, isAuthenticated, messages.length, chatId, isGroup]);
}