import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSavedBlogs, setLoading } from "@/Redux/blogInteractionsSlice";
import api from "@/lib/api";

export default function useSavedBlogs() {
    const dispatch = useDispatch();
    const { isAuthenticated, user } = useSelector(state => state.auth);

    useEffect(() => {
        if (!isAuthenticated || !user?.id) return;

        dispatch(setLoading(true));

        api.get('/api/saved-blogs')
            .then(res => {
                dispatch(setSavedBlogs(res.data));
                dispatch(setLoading(false));
            })
            .catch(error => {
                console.error('Error fetching saved blogs:', error);
                dispatch(setLoading(false));
            });
    }, [dispatch, isAuthenticated, user?.id]);
}