import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoadingUserGroups, setUserGroups } from "@/Redux/groupsSlice";
import api from "@/lib/api";

export default function useUserGroups() {
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector(state => state.auth);
    
    useEffect(() => {
        if (!isAuthenticated) return;
        dispatch(setLoadingUserGroups(true));
        
        api.get('/api/groups?filter=my_groups')
            .then(res => {
                dispatch(setUserGroups(res.data));
                dispatch(setLoadingUserGroups(false));
            })
            .catch(err => {
                console.error('Error fetching user groups:', err);
                dispatch(setLoadingUserGroups(false));
            });
    }, [dispatch, isAuthenticated]);
}



