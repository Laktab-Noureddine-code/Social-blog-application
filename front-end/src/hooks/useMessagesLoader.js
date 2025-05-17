import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessages, setMessagesLoading } from "../Redux/messagesSlice";
export default function useMessagesLoader(chatId, isGroup) {
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.access_token);
    const { messages } = useSelector(state => state.messages);

    useEffect(() => {
        if (!token || isGroup) return;
        const fetchMessages = async () => {
            dispatch(setMessagesLoading(true));
            try {
                const res = await fetch(`/api/messages/${chatId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json',
                    }
                });

                if (res.ok) {
                    const data = await res.json();
                    dispatch(setMessages(data));
                    dispatch(setMessagesLoading(false));
                }
            } catch (err) {
                console.error('Error fetching messages:', err);
            } 
        };

        fetchMessages();
    }, [dispatch, token, messages.length ,chatId ,isGroup]);
}