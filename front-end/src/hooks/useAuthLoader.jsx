// hooks/useAuthLoader.js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoading, setToken, setUser } from "../Redux/authSlice";

export default function useAuthLoader() {
    const dispatch = useDispatch();
    const state = useSelector(state=>state)

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (!token) {
            // dispatch(logout());
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
                dispatch(setToken(token));
                dispatch(setIsLoading(false));
            } 
        };
        getUser();
    }, [dispatch]);
}
