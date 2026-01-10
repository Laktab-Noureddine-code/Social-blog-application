/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { toggleSavedBlog } from '@/Redux/blogInteractionsSlice';
import useSavedBlogs from '@/shared/hooks/useSavedBlogs';
import api from '@/lib/api';

function SaveBlogButton({ blogId, isInitiallySaved, onSaveToggle }) {
    useSavedBlogs();
    const [isSaved, setIsSaved] = useState(isInitiallySaved);
    const [isLoading, setIsLoading] = useState(false);
    const savedBlogs = useSelector(state => state.blogInteractions.savedBlogs);
    const dispatch = useDispatch();
    
    // Check if the blog is in the savedBlogs array
    useEffect(() => {
        const blogIsSaved = savedBlogs.some(blog => blog.id === blogId);
        if (blogIsSaved !== isSaved) {
            setIsSaved(blogIsSaved);
        }
    }, [savedBlogs, blogId, isSaved]);

    const handleSaveToggle = async () => {
        setIsLoading(true);
        try {
            // Utiliser la nouvelle route toggle
            const response = await api.post(`/api/blogs/${blogId}/toggle-save`);
            
            // Mettre à jour l'état local
            const newSavedState = response.data.saved;
            setIsSaved(newSavedState);
            
            // Mettre à jour le state Redux
            dispatch(toggleSavedBlog({ blogId, isSaved: newSavedState }));
            
            // Si un callback onSaveToggle est fourni, l'appeler avec le nouvel état
            if (onSaveToggle) {
                onSaveToggle(newSavedState);
            }
        } catch (error) {
            console.error('Error toggling save:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            onClick={handleSaveToggle}
            disabled={isLoading}
            className="text-gray-600 hover:text-blue-600 transition-colors"
            title={isSaved ? 'Unsave this blog' : 'Save this blog'}
        >
            {isSaved ? (
                <BookmarkCheck className="h-5 w-5 fill-current" />
            ) : (
                <Bookmark className="h-5 w-5" />
            )}
        </button>
    );
}

export default SaveBlogButton;