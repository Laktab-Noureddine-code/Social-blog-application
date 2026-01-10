import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setGroupMessages, setGroupMessagesLoading } from "@/Redux/messagesSlice";
import api from "@/lib/api";

export default function useGroupMessages(group, isGroup) {
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector(state => state.auth);
    
    useEffect(() => {
        if (!isGroup || !group || !isAuthenticated) return;
        dispatch(setGroupMessagesLoading(true));
        
        api.get(`/api/group/messages/${group}`)
            .then(res => {
                dispatch(setGroupMessages(res.data));
                dispatch(setGroupMessagesLoading(false));
            })
            .catch(err => {
                console.error('Error fetching group messages:', err);
                dispatch(setGroupMessagesLoading(false));
            });
    }, [dispatch, isAuthenticated, group, isGroup]);
}



