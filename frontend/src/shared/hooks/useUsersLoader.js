import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "@/Redux/usersSlice";
import api from "@/lib/api";

const useUsersLoader = () => {
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector(state => state.auth);
    const users = useSelector(state => state.users.users);

    useEffect(() => {
        if (!isAuthenticated || users.length > 0) return;

        let isMounted = true;

        const fetchUsers = async () => {
            try {
                const response = await api.get("/api/users");
                if (isMounted) {
                    dispatch(setUsers(response.data));
                }
            } catch (error) {
                if (isMounted) console.error("Error loading users:", error);
            }
        };

        fetchUsers();
        return () => { isMounted = false };
    }, [dispatch, isAuthenticated, users.length]);
};

export default useUsersLoader;
