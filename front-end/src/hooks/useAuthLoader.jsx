// hooks/useAuthLoader.js
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout, setIsLoading, setUser } from "../Redux/authSlice";

export default function useAuthLoader() {
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            dispatch(logout());
            dispatch(setIsLoading(false));
            return;
        }
        
        const getUser = async () => {
            const res = await fetch('/api/user', {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            if (res.ok) {
                dispatch(setUser(data));
                dispatch(setIsLoading(false));
            } else {
                dispatch(logout());
            }
        };
        
        getUser();
    }, [dispatch]);
}
