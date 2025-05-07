// hooks/useAuthLoader.js
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout, setUser } from "../Redux/authSlice";

export default function useAuthLoader() {
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
            return;
        }

        const getUser = async () => {
            const res = await fetch('/api/user', {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            if (res.ok) {
                dispatch(setUser(data));
            } else {
                dispatch(logout());
            }
        };

        getUser();
    }, [dispatch]);
}
