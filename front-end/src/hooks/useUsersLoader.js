import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "../Redux/usersSlice";

export default function useUsersLoader() {
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token);

    useEffect(() => {
        const fetchUsers = async () => {
            const res = await fetch('/api/users', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await res.json();
            if (res.ok) {
                dispatch(setUsers(data));
            } else {
                console.error('Failed to fetch users');
            }
        };
        if (token) {
            fetchUsers();
        }
    }, [dispatch, token]);
}
