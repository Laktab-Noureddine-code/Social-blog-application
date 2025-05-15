import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "../Redux/usersSlice";

const useUsersLoader = () => {
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.access_token);
    const users = useSelector(state => state.users.users);

    useEffect(() => {
        if (!token || users.length > 0) return;

        let isMounted = true;

        const fetchUsers = async () => {
            try {
                const response = await fetch("/api/users", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json',
                    }
                });

                if (isMounted && response.ok) {
                    const data = await response.json();
                    dispatch(setUsers(data));
                }
            } catch (error) {
                if (isMounted) console.error("Error loading users:", error);
            }
        };

        fetchUsers();
        return () => { isMounted = false };
    }, [dispatch, token, users.length]);
};

export default useUsersLoader;
