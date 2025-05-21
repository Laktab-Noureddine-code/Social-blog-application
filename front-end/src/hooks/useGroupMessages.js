import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setGroupMessages, setGroupMessagesLoading } from "../Redux/messagesSlice";
export default function useGroupMessages(group, isGroup) {
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.access_token);
    useEffect(() => {
        if (!isGroup || !group) return;
        dispatch(setGroupMessagesLoading(true))
        axios.get(`/api/group/messages/${group}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                dispatch(setGroupMessages(res.data));
                dispatch(setGroupMessagesLoading(false))
            })
    }, [dispatch, token, group, isGroup]);
}



