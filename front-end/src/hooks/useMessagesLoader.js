import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessages  } from "../Redux/messagesSlice";
import { setLoading } from "../Redux/AmisSicie";

export default function useMessagesLoader() {
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.access_token);
    const { messages } = useSelector(state => state.messages);

    useEffect(() => {
        if (!token || messages.length > 0) return;
        dispatch(setLoading(false)); // Set loading to false when done
        const fetchMessages = async () => {
            try {
                dispatch(setLoading(true)); // Set loading to true before fetch
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
            } finally {
                dispatch(setLoading(false)); // Set loading to false when done
            }
        };

        fetchMessages();
    }, [dispatch, token, messages.length]);
}