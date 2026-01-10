import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriendsLoading, setRelatedUsers } from "@/Redux/relatedUsersSlice";
import api from "@/lib/api";

export default function useReltedUsers() {
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector(state => state.auth);

    useEffect(() => {
        if (!isAuthenticated) return;
        dispatch(setFriendsLoading(true));

        const fetchReltedUsers = async () => {
            try {
                const response = await api.get("/api/related-users");
                dispatch(setRelatedUsers(response.data));
                dispatch(setFriendsLoading(false));
            } catch (error) {
                console.error("Error loading users:", error);
                dispatch(setFriendsLoading(false));
            }
        };

        fetchReltedUsers();
    }, [dispatch, isAuthenticated]);
}

