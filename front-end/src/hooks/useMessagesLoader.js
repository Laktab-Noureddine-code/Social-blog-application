import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../Redux/messagesSlice";

export default function useMessagesLoader() {
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.access_token);
    const messages = useSelector(state => state.messages.messages);

    useEffect(() => {
        if (!token || messages.length > 0) return;
        const fetchMessages = async () => {
            try {
                const res = await fetch('/api/messages', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json',
                    }
                });

                if (res.ok) {
                    const data = await res.json();
                    dispatch(setMessages(data));
                }
            } catch (err) {
                console.error('Error fetching messages:', err);
            }
        };

        fetchMessages();
    }, [dispatch, token, messages.length]);
}
