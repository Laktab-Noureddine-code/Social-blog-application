import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoadingUserGroups, setUserGroups } from "../Redux/groupsSlice";

export default function useUserGroups() {
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.access_token);
    useEffect(() => {
        dispatch(setLoadingUserGroups(true))
        axios.get('/api/groups/userGroups', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                dispatch(setUserGroups(res.data));
                dispatch(setLoadingUserGroups(false))
            })
    }, [dispatch, token]);
}



