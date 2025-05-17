import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriendsLoading, setRelatedUsers } from "../Redux/relatedUsersSlice";

export default function useReltedUsers() {
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.access_token);

    useEffect(() => {
        if (!token) return;
        dispatch(setFriendsLoading(true));

        const fetchReltedUsers = async () => {
            try {
                const response = await fetch("/api/related-users", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json',
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    dispatch(setRelatedUsers(data));
                    dispatch(setFriendsLoading(false));
                }
            } catch (error) {
                console.error("Error loading users:", error);
            }
        };

        fetchReltedUsers();
    }, [dispatch, token]);
}

