import { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Bookmark, BookmarkCheck } from 'lucide-react';

function SaveBlogButton({ blogId, isInitiallySaved }) {
    const [isSaved, setIsSaved] = useState(isInitiallySaved);
    const [isLoading, setIsLoading] = useState(false);
    const token = useSelector(state => state.auth.access_token);

    const handleSaveToggle = async () => {
        setIsLoading(true);
        try {
            if (isSaved) {
                await axios.delete(`/api/blogs/${blogId}/unsave`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } else {
                await axios.post(`/api/blogs/${blogId}/save`, {}, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            }
            setIsSaved(!isSaved);
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