import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPath } from "@/Redux/authSlice";
import { useLocation } from "react-router-dom";
import SavedBlogsList from "./SavedBlogsList";
import useSavedBlogs from '@/shared/hooks/useSavedBlogs';

export default function SavedBlogsContainer() {
    // Use the custom hook to fetch saved blogs
    useSavedBlogs();

    const savedBlogs = useSelector(state => state.blogInteractions.savedBlogs);
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        dispatch(setPath(location.pathname));
    }, [dispatch, location.pathname]);

    return (
        <main className="container mx-auto px-4 py-8 bg-gray-50 dark:bg-gray-950 min-h-screen">
            <SavedBlogsList savedBlogs={savedBlogs}/>
        </main>
    );
}