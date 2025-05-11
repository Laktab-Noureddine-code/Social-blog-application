import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setGroupMessages } from "../Redux/messagesSlice";
export default function useGroupMessages() {
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token);
    useEffect(() => {
        axios.get('/api/group/messages', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                dispatch(setGroupMessages(res.data));
            })
    }, [dispatch, token]);
}



